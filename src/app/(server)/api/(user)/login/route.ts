import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";

connectToDB();

export async function POST(request: Request) {
	try {
		//Getting data from client
		const { password, username }: LoginRequestDataInterface =
			await request.json();

		//Checking if username exsist or not
		const user = await userModel
			.findOne({ username })
			.populate("posts")
			.populate("following", ["_id", "name", "username", "image"])
			.populate("followers", ["_id", "name", "username", "image"])
			.populate("blocked_users", ["_id", "name", "username", "image"]);
		if (!user) {
			return NextResponse.json({
				success: false,
				message: "This username does not exist",
			});
		}

		//Checkin login credentials
		if (user.password !== password) {
			return NextResponse.json({
				success: false,
				message: "Invalid credentials",
			});
		}

		//Instead of returning response directly, storing it into a variable to set cookies
		const response = NextResponse.json({
			success: true,
			message: `Welcome back ${user.name.split(" ")[0]}!`,
			data: user,
		});

		//Setting cookies
		const token = btoa(String(user._id));
		response.cookies.set("token", token, {
			httpOnly: true,
			secure: true,
			maxAge: 3600,
		});

		return response;
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
