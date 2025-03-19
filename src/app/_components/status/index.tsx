"use client";
import React from "react";
import { Stack } from "@mui/material";
import { MyStatus, UserStatus } from "./_components";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function Status() {
	const { isAuthenticated, userData } = useSelector(
		(state: RootState) => state.User
	);

	return !isAuthenticated ? null : (
		<Stack direction={"row"} overflow={"auto"} spacing={2}>
			<MyStatus
				statusArray={userData.status || []}
				loggedInUserImage={userData?.image?.image_url || ""}
			/>

			{/* Other connected users status component */}
			<UserStatus followings={userData.following || []} />
		</Stack>
	);
}
