import { NextResponse } from "next/server";
import { connectToDB } from "../../../_database/connectToDatabase";
import { userModel } from "../../../_database/models";
import { cookies } from "next/headers";

connectToDB();

export async function PUT(request: Request) {
	try {
		//Getting data from client
		const { userId }: FollowUnfollowUserRequestDataInterface =
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

        //Checking if user trying to follow himself/herself
		if (userId === id) {
			return NextResponse.json({
				success: false,
				message: "You cannot follow yourself.",
			});
		}

		//Finding the user who is following
		const firstUser = await userModel.findById(id);
		//Finding the user who is getting followed
		const secondUser = await userModel.findById(userId);
		//Checking if the following id exist in the array of following or not
		if (!firstUser?.following.includes(String(userId))) {
			//Pushing second person id into first person following array
			firstUser?.following.push(String(userId));
			//Pushing first person id into second person followers array
			secondUser?.followers.push(String(id));
			await firstUser?.save();
			await secondUser?.save();
			return NextResponse.json({
				success: true,
				message: "You followed this user.",
				data: userId,
			});
		}
		//Finding the index of user to be removed from first person's following array
		const indexOfFollowing = firstUser.following.indexOf(String(userId));
		firstUser.following.splice(indexOfFollowing, 1);
		//Finding the index of user to be removed from second person's followers array
		const indexOfFollower = secondUser?.followers.indexOf(String(id));
		secondUser?.followers.splice(Number(indexOfFollower), 1);
		await firstUser.save();
		await secondUser?.save();

		return NextResponse.json({
			success: true,
			message: "You unfollowed this user.",
			data: userId,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
