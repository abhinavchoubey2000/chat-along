import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";
import { postModel, PostSchemaInterface } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();

interface EditPostCaptionRequestDataInterface {
	postId: string;
	caption: string;
}

export async function PATCH(request: Request) {
	try {
		//Getting data from client
		const { postId, caption }: EditPostCaptionRequestDataInterface =
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

		//Finding and updating post by post id
		await postModel.findByIdAndUpdate(postId, { caption });

		return NextResponse.json({
			success: true,
			message: "Post caption updated.",
			data: caption,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
