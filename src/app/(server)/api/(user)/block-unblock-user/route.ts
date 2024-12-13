import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();

interface BlockUnblockUserRequestDataInterface {
	userId: string;
}

export async function PUT(request: Request) {
	try {
		//Getting data from client
		const { userId }: BlockUnblockUserRequestDataInterface =
			await request.json();
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

		//Checking if user trying to block himself/herself
		if (userId === id) {
			return NextResponse.json({
				success: false,
				message: "You cannot block yourself.",
			});
		}

		const user = await userModel.findById(id);

		//Checking if the blocked user id exist in the array of blocked users or not
		if (!user?.blocked_users.includes(String(userId))) {
			//Pushing user id into blocked_users array
			user?.blocked_users.push(String(userId));
			await user?.save();
			return NextResponse.json({
				success: true,
				message: "You blocked this user.",
				data: userId,
			});
		}
		//Finding the index of user to be unblocked from blocked_users array
		const indexOfBlockedUser = user.blocked_users.indexOf(String(userId));
		user.blocked_users.splice(indexOfBlockedUser, 1);

		await user.save();

		return NextResponse.json({
			success: true,
			message: "You unblocked this user.",
			data: userId,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
