import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";

connectToDB();

interface ViewUserProfileRequestDataInterface {
	userId: string;
}

interface ViewUserProfileResponseDataInterface {
	name: string;
	posts: [];
	followers: string[];
	following: string[];
	username: string;
	image: string;
}

export async function POST(request: Request) {
	try {
		const { userId }: ViewUserProfileRequestDataInterface =
			await request.json();

		//Only populating the data which is necessary
		const user = await userModel
			.findById(userId)
			.populate({ path: "posts" })
			.populate({ path: "following", select: "_id name image" })
			.populate({ path: "followers", select: "_id name image" });

		if (!user) {
			return NextResponse.json({
				success: false,
				message: "User not found.",
			});
		}

		const responseData: ViewUserProfileResponseDataInterface = {
			name: String(user?.name),
			posts: user?.posts || [],
			image: String(user?.image),
			username: String(user?.username),
			followers: Array.isArray(user?.followers) ? user.followers : [],
			following: Array.isArray(user?.following) ? user.following : [],
		};

		return NextResponse.json({
			success: true,
			message: "Fetched user profile.",
			data: responseData,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
