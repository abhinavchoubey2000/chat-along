import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();

export async function PUT() {
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

		const user = await userModel.findById(id);
		if (user) {
			user.notifications = [];
		}
		await user?.save();

		return NextResponse.json({
			success: true,
			message: `Notification cleared`,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
