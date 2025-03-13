import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();

export async function GET(request: Request) {
	try {
		//Call and initialize cookies function
		const callCookies = cookies();
		const cookie = (await callCookies).get("token")?.value;

		//Checking if cookie exist or not
		if (!cookie) {
			return NextResponse.json({
				success: false,
				message:
					"You are not authorized to perform this action. Please login first.",
			});
		}

		//Converting cookie to User Id
		const id = atob(String(cookie));
		const user = await userModel
			.findById(id)
			.populate("posts", ["_id", "post_image", "likes", "comments"])
			.populate("following", ["_id", "name", "username", "image"])
			.populate("followers", ["_id", "name", "username", "image"]);
			
		return NextResponse.json({
			success: true,
			message: "Fetched user profile.",
			data: user,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
