import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { postModel } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();

interface EditPostCommentRequestDataInterface {
	comment: string;
	postId: string;
	commentId: string;
}

export async function PATCH(request: Request) {
	try {
		//Getting data from client
		const { postId, commentId, comment }: EditPostCommentRequestDataInterface =
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
		// const id = atob(String(cookie));

		//Finding the post and then inside post.comments finding the comment id to update new one
		await postModel.findOneAndUpdate(
			{
				_id: postId,
				"comments._id": commentId,
			},
			{
				$set: {
					"comments.$.comment": comment,
				},
			}
		);
		return NextResponse.json({
			success: true,
			message: "Post comment updated successfully successfully.",
			data: comment,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
