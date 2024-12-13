import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();
interface DeleteUserAdminRequestDateInterface {
	userId: string;
}
export async function DELETE(request: Request) {
	try {
		//Getting data from client
		const { userId }: DeleteUserAdminRequestDateInterface =
			await request.json();
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

		const user = await userModel.findByIdAndDelete(userId);

		return NextResponse.json({
			success: true,
			message: "User deleted.",
			data: user,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
