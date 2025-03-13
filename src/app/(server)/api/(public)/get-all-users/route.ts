import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";

connectToDB();

export async function GET(request: Request) {
	try {
		const users = await userModel
			.find({})
			.populate("posts")
			.populate("following", ["_id", "name", "username", "image"])
			.populate("followers", ["_id", "name", "username", "image"]);
		return NextResponse.json({
			success: true,
			message: "Fetched all users.",
			data: users,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
