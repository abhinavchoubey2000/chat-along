import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";
import { postModel, PostSchemaInterface } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();

interface DeletePostRequestDataInterface {
	postId: string;
}

export async function DELETE(request: Request) {
	try {
		//Getting data from client
		const { postId }: DeletePostRequestDataInterface = await request.json();
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
		const deletedPost = await postModel.findByIdAndDelete(postId);

		//Converting cookie to User Id
		const id = atob(String(cookie));
		//Deleting post id in user posts array
		const user = await userModel.findById(id);
		const deletedPostIndex = user?.posts.indexOf(postId);
		user?.posts.splice(Number(deletedPostIndex), 1);
		await user?.save();

		return NextResponse.json({
			success: true,
			message: "Post deleted.",
			data: deletedPost,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}