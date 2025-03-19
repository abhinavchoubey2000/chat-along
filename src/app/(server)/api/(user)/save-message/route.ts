import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();

export async function POST(request: Request) {
	try {
		//Getting data from client
		const {
			receiverId,
			time,
			message,
			image,
		}: {
			receiverId: string;
			time: string;
			message: string;
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
		const sender = await userModel.findById(id);
		if (!sender) {
			return NextResponse.json({
				success: false,
				message: "Sender not found.",
			});
		}
		if (!sender.chats) {
			sender.chats = {};
		}
		if (!sender.chats[receiverId]) {
			sender.chats[receiverId] = [];
		}

		sender.chats[receiverId].push({
			name: "sender",
			image,
			message,
			time,
			seen: false,
		});

		const receiver = await userModel.findById(receiverId);
		if (!receiver) {
			return NextResponse.json({
				success: false,
				message: "Receiver not found.",
			});
		}
		if (!receiver.chats) {
			receiver.chats = {};
		}
		if (!receiver.chats[id]) {
			receiver.chats[id] = [];
		}
		receiver.chats[id].push({
			name: "receiver",
			image,
			message,
			time,
			seen: false,
		});

		sender.markModified("chats");
		await sender.save();
		receiver.markModified("chats");
		await receiver.save();
		
		return NextResponse.json({
			success: true,
			message: `Message saved`,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
