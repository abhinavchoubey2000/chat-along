import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel} from "../../../_database/models";

connectToDB();

export async function POST(request: Request) {
	try {
		//Getting data from client
		const { email }: { email: string } = await request.json();

		//Checking if email already exist
		const matachedEmail = await userModel.findOne({ email });
		if (matachedEmail) {
			return NextResponse.json({
				success: false,
				message: "The email you entered is already in use",
			});
		}
		return NextResponse.json({
			success: true,
			message: "This is a valid email.",
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
