import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel, UserSchemaInterface } from "../../../_database/models";

connectToDB();

export async function POST(request: Request) {
	//Save Signup credentials to database
	const saveData: SaveDataFunctionInterface = async (data) => {
		const { email, password, image, name, phone, username } = data;
		const newUser: UserSchemaInterface = new userModel({
			email,
			password,
			image,
			name,
			phone,
			username,
		});

		await newUser.save();
		return newUser;
	};

	try {
		//Getting data from client
		const {
			email,
			password,
			image,
			name,
			phone,
			username,
		}: SignupRequestDataInterface = await request.json();

		//Calling save data function
		const newUser = saveData({
			email,
			password,
			image,
			name,
			phone,
			username,
		});

		return NextResponse.json({
			success: true,
			message: "User created successfully.",
			data: newUser,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
