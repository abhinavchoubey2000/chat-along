import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		//Getting data from client
		const { password, username }: LoginRequestDataInterface =
			await request.json();

		if (password!=="adminabhinav" || username!=="abhi@29") {
			return NextResponse.json({
				success: false,
				message: "Invalid admin credentials",
			});
		}


		//Instead of returning response directly, storing it into a variable to set cookies
		const response = NextResponse.json({
			success: true,
			message: `Welcome back Mr. Abhinav.`,
		});

		//Setting cookies
		const token = btoa(String(username));
		response.cookies.set("token-admin", token, {
			httpOnly: true,
			secure: true,
			maxAge: 3600,
		});

		return response;
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
