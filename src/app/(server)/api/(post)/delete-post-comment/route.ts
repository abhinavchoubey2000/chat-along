import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { postModel } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();

interface DeletePostCommentRequestDataInterface {
	commentId: string;
	postId: string;
}
interface CommentsInterface {
	_id: string;
	comment: string;
	userId: string;
}

export async function DELETE(request: Request) {
	try {
		//Getting data from client
		const { commentId, postId }: DeletePostCommentRequestDataInterface =
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

		//Finding the post by the id to delete its comment
		const post = await postModel.findById(postId);

		//Finding the index of comment which is to be deleted from comments array
		const indexOfLikedUser = post?.comments.findIndex(
			(value) => (value as CommentsInterface)._id === commentId
		);
		post?.comments.splice(Number(indexOfLikedUser), 1);
		await post?.save();

		return NextResponse.json({
			success: true,
			message: "comment Deleted.",
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
