import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { postModel } from "../../../_database/models";

connectToDB();

export async function GET(request: Request) {
	try {
		const posts = await postModel
			.find({})
			.populate("creator", ["name", "username", "image"])
			.populate("comments.userId", ["name", "username", "image"])
			.populate("likes", ["id", "name", "username", "image"]);

		return NextResponse.json({
			success: true,
			message: "Fetched public posts.",
			data: posts.reverse(),
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
