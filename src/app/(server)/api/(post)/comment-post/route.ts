import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { postModel, PostSchemaInterface } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();

interface CommentPostRequestDataInterface {
	postId: string;
	comment: string;
}

export async function POST(request: Request) {
	try {
		
		//Getting data from client
		const { postId, comment }: CommentPostRequestDataInterface =
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
		const post = await postModel.findById(postId);
		post?.comments.push({ comment, userId: id });
		await post?.save();

		return NextResponse.json({
			success: true,
			message: "New comment added.",
			data: comment,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
