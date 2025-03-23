import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { postModel } from "../../../_database/models";

connectToDB();

export async function POST(request: Request) {
	try {
		const { postId }: { postId: string } = await request.json();
		const post = await postModel
			.findById(postId)
			.populate("creator", ["name", "username", "image"])
			.populate("comments.userId", ["name", "username", "image"])
			.populate("likes", ["id", "name", "username", "image"]);

		return NextResponse.json({
			success: true,
			message: "Fetched post.",
			data: post,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
