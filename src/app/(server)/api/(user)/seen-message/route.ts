import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();

export async function PUT(request: Request) {
	try {
		//Getting data from client
		const {
			userId,
		}: {
			userId: string;
		} = await request.json();

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

		const user = await userModel.findById(id);
		if (user?.chats?.[userId] && user.chats[userId].length > 0) {
			user.chats[userId][user.chats[userId].length - 1].seen = true;
		}

		user?.markModified("chats");
		await user?.save();

		return NextResponse.json({
			success: true,
			message: `Message seen`,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
