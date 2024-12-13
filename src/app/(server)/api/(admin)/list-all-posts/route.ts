import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { postModel } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();
export async function GET() {
	try {
		//Call and initialize cookies function
		const callCookies = cookies();
		const cookie = (await callCookies).get("token-admin")?.value;

		//Checking if cookie exist or not
		if (!cookie) {
			return NextResponse.json({
				success: false,
				message:
					"You do not have authority to perform this action, only admin can.",
			});
		}

		const posts = await postModel.find({})

		return NextResponse.json({
			success: true,
			message: "Fetched all posts.",
			data: posts,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
