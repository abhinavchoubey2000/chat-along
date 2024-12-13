import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";

connectToDB();

interface SearchUserRequestDataInterface {
	query: string;
}

interface SearchUserResponseDataInterface {
	name: string;
	username: string;
	image: string;
}

export async function POST(request: Request) {
	try {
		const { query }: SearchUserRequestDataInterface = await request.json();

		const user = await userModel
			.find({
				username: { $regex: `^${query}`, $options: "i" },
			}).select("_id name username image")

		if (!user) {
			return NextResponse.json({
				success: false,
				message: "User not found.",
			});
		}

		// const responseData: SearchUserResponseDataInterface = {
		// 	name: String(user?.name),
		// 	image: String(user?.image),
		// 	username: String(user?.username),
		// };

		return NextResponse.json({
			success: true,
			message: "Searched users.",
			data: user,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
