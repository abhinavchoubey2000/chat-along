import { NextResponse } from "next/server";

import { cookies } from "next/headers";

export async function DELETE() {
	try {
		//Initializing cookie function
		const storeCookies = cookies();
		//Checking if cookie is already present or not
		const cookie = (await storeCookies).get("token");
		if (!cookie) {
			return NextResponse.json({
				success: false,
				message: "You are already logged out.",
			});
		}

		const response = NextResponse.json({
			success: true,
			message: "Logged out.",
		});
		//Deleting cookie
		response.cookies.delete("token");

		return response;
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
