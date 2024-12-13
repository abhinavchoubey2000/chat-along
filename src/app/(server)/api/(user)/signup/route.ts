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

	//Suggest username to client
	const getUsername: GenerateUsernameFunctionInterface = (name, phone) => {
		const symbols = ["_", ".", "@", "-"];
		const randomSymbolsIndex = Math.floor(Math.random() * symbols.length);
		const randomSymbol = symbols[randomSymbolsIndex];
		const firstName = name.split(" ")[0].substring(0, 5);
		const middle4DigitNumbers = phone.substring(3, 7);
		const nameAndNumber = firstName + middle4DigitNumbers;
		const randomPostionsForSymbols =
			Math.floor(Math.random() * (nameAndNumber.length - 1 - 2 + 1)) + 2;
		const username =
			nameAndNumber.slice(0, randomPostionsForSymbols) +
			randomSymbol +
			nameAndNumber.slice(randomPostionsForSymbols);

		return username.toLowerCase();
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

		//Checking if email already exist
		const matachedEmail = await userModel.findOne({ email });
		if (matachedEmail) {
			return NextResponse.json({
				success: false,
				message: "The email you entered is already in use",
			});
		}

		//Checking the username validation
		const checkUsernameValidation = /[+\`!#$%^&*()={}\[\]|\\:;"'<>,?/]/.test(
			String(username)
		);
		if (checkUsernameValidation) {
			const suggestedUserName = getUsername(name, phone);
			return NextResponse.json({
				success: false,
				message:
					"The username could only include these special characters [@ _ - .]",
				data: suggestedUserName,
			});
		}

		//Checking if username already exists
		const matachedUsername = await userModel.findOne({ username });
		if (matachedUsername) {
			const suggestedUserName = getUsername(name, phone);
			return NextResponse.json({
				success: false,
				message: "This username has been already taken.",
				data: suggestedUserName,
			});
		}

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
