import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();

export async function DELETE(request: Request) {
	try {
		//Getting data from client
		const { statusId }: DeleteStatusRequestDataInterface = await request.json();
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
		const user = await userModel.findById(id);
		//Checking if status id exist or not
		const matchedStatusId = user?.status.find(
			(value: StatusInterface) => String(value._id) === statusId
		);
		if (!matchedStatusId) {
			return NextResponse.json({
				success: false,
				message: "Status id not found.",
			});
		}

		//Finding the index of status to be deleted
		const indexOfStatus = user?.status.findIndex(
			(value: StatusInterface) => String(value._id) === statusId
		);
		//Deleting the status by index
		user?.status.splice(Number(indexOfStatus), 1);
		await user?.save();

		return NextResponse.json({
			success: true,
			message: "Status deleted",
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
