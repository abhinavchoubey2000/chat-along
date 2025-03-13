import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { postModel } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();

interface LikeUnlikePostRequestDataInterface {
	postId: string;
}

export async function PUT(request: Request) {
	try {
		//Getting data from client
		const { postId }: LikeUnlikePostRequestDataInterface = await request.json();
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
		//Finding the post by the id to like or unlike
		const post = await postModel.findById(postId);
		//Checking if the user already liked the post or not
		if (!post?.likes.includes(String(id))) {
			//Pushing user id into post liked array
			post?.likes.push(String(id));
			await post?.save();
			return NextResponse.json({
				success: true,
				message: "You liked this post.",
				data: post?._id,
			});
		}
		//Finding the index of user who already liked the post from posts array
		const indexOfLikedUser = post.likes.indexOf(String(id));
		post.likes.splice(indexOfLikedUser, 1);
		await post.save();

		return NextResponse.json({
			success: true,
			message: "You unliked this post.",
			data: post._id,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
