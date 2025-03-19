import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();

export async function POST(request: Request) {
	try {
		//Getting data from client
		const {
			action,
			link,
			senderName,
			image,
			receiverId,
		}: {
			action: string;
			link: string;
			senderName: string;
			receiverId: string;
			image: { image_url: string; public_id: string };
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

		//Checking if username exsist or not
		const receiver = await userModel.findById(receiverId);
		if (!receiver) {
			return NextResponse.json({
				success: false,
				message: "Receiver not found.",
			});
		}

		receiver.notifications.push({
			name: senderName,
			image,
			action,
			link,
		});

		await receiver.save();

		return NextResponse.json({
			success: true,
			message: `Notification saved`,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
