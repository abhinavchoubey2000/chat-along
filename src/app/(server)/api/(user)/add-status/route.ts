import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";
import { cookies } from "next/headers";
import mongoose from "mongoose";

connectToDB();

interface AddStatusRequestDataInterface {
	statusContent: string;
	colorName: string;
	colorCode: string;
}

export async function POST(request: Request) {
	try {
		const {
			statusContent,
			colorCode,
			colorName,
		}: AddStatusRequestDataInterface = await request.json();
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
		const objectId = new mongoose.Types.ObjectId();
		user?.status.push({
			_id: String(objectId),
			statusContent,
			colorCode,
			colorName,
		});
		await user?.save();

		return NextResponse.json({
			success: true,
			message: "Added status.",
			data: statusContent,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
