import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();

export async function PUT(request: Request) {
	const checkIfEmailExists = async (email: string) => {
		const matchedEmail = await userModel.findOne({ email });
		return matchedEmail;
	};

	try {
		//Getting data from client
		const { name, email, phone, image }: EditUserProfileRequestDataInterface =
			await request.json();

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

		if (user?.email !== email) {
			const result = await checkIfEmailExists(email);
			if (result) {
				return NextResponse.json({
					success: false,
					message: "The email you are trying to add is already in use.",
				});
			}
		}

		await userModel.findByIdAndUpdate(id, {
			name,
			email,
			image,
			phone,
		});

		return NextResponse.json({
			success: true,
			message: "User profile updated successfully successfully.",
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
