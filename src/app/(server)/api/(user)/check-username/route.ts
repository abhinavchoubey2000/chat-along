import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";

connectToDB();

export async function POST(request: Request) {
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
			firstName,
			username,
			phone,
		}: { firstName: string; username: string; phone: string } =
			await request.json();

		//Checking the username validation
		const checkUsernameValidation = /[+\`!#$%^&*()={}\[\]|\\:;"'<>,?/]/.test(
			String(username)
		);
		if (checkUsernameValidation) {
			const suggestedUserName = getUsername(firstName, phone);
			return NextResponse.json({
				success: false,
				message: `The username could only include these special characters ['@', '_', '-' and '.']`,
				data: suggestedUserName,
			});
		}

		const matachedUsername = await userModel.findOne({ username });
		if (matachedUsername) {
			const suggestedUserName = getUsername(firstName, phone);
			return NextResponse.json({
				success: false,
				message: "This username has been already taken.",
				data: suggestedUserName,
			});
		}

		return NextResponse.json({
			success: true,
			message: "This is a valid username.",
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
