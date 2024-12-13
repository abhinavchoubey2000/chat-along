import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();

export async function PATCH(request: Request) {
	try {
		//Getting data from client
		const { oldPassword, newPassword }: ChangePasswordRequestDataInterface =
			await request.json();

		//Call and initialize cookies function
		const callCookies = cookies();
		const cookie = (await callCookies).get("token")?.value;

		//Checking if cookie exist or not
		if (!cookie) {
			return NextResponse.json({
				success: false,
				message: "You are not authorized to perform this action. Please login first.",
			});
		}

		//Checking if password matches or not
		const matchedPassword = await userModel.findOne({ password: oldPassword });
		if (!matchedPassword) {
			return NextResponse.json({
				success: false,
				message: "Your old password is incorrect",
			});
		}

		//Updating to the new password
		await userModel.findOneAndUpdate(
			{ password: oldPassword },
			{
				password: newPassword,
			}
		);

		return NextResponse.json({
			success: true,
			message: "Password changed successfully.",
			data: newPassword,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
