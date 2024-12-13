import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";
import { postModel, PostSchemaInterface } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();

interface CreatePostRequestDataInterface {
	post_image: string;
	caption: string;
}

export async function POST(request: Request) {
	try {
		//Getting data from client
		const { post_image, caption }: CreatePostRequestDataInterface =
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
		const post: PostSchemaInterface = new postModel({
			creator: id,
			caption,
			post_image,
			comments: [],
			likes: [],
		});
		await post.save();

		//Saving post id in user posts array
		const user = await userModel.findById(id);
		user?.posts.push(String(post._id));
		await user?.save();

		return NextResponse.json({
			success: true,
			message: "New post created.",
			data: post,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
