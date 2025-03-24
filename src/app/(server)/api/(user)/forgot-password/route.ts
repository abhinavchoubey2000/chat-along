import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";

connectToDB();

export async function PUT(request: Request) {
	try {
		//Getting data from client
		const {
			password,
			username,
			email,
		}: { password: string; email: string; username: string } =
			await request.json();

		const user = await userModel.findOne({ username, email });
		if (!user) {
			return NextResponse.json({
				success: false,
				message: "Your username and email doesnt match. Try again.",
			});
		}
		user.password = password;

		await user.save();

		return NextResponse.json({
			success: true,
			message: "User password is now changed.",
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
