"use client";
import React from "react";
import { Stack } from "@mui/material";
import { MyStatus, UserStatus } from "./_components";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function Status() {
	const { isAuthenticated } = useSelector((state: RootState) => state.User);

	return !isAuthenticated ? null : (
		<Stack direction={"row"} overflow={"auto"} spacing={2}>
			{/* Logged in user status component */}
			<MyStatus
				statusArray={[
					{ _id: 1, statusContent: "Today I am feeling bad.", bgColor: "red" },
					{
						_id: 2,
						statusContent: "Today I am feeling good.",
						bgColor: "yellow",
					},
					{
						_id: 3,
						statusContent: "Today I am feeling happy.",
						bgColor: "blue",
					},
					{
						_id: 4,
						statusContent: "Today I am feeling angry.",
						bgColor: "green",
					},
					{
						_id: 5,
						statusContent: "Today I am feeling demotivated.",
						bgColor: "black",
					},
				]}
			/>
			{/* Other connected users status component */}
			<UserStatus
				statusArray={[
					{
						username: "ansh@12",
						image:
							"https://images.unsplash.com/photo-1708752316614-5454d905e654?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						status: [
							{
								_id: 1,
								statusContent: "My name is Anshul.",
								bgColor: "yellow",
							},
							{
								_id: 2,
								statusContent: "Abhinav is my childhood friend.",
								bgColor: "green",
							},
							{
								_id: 3,
								statusContent: "Abhinav is my brother.",
								bgColor: "red",
							},
						],
					},
					{
						username: "aman@12",
						image:
							"https://plus.unsplash.com/premium_photo-1673296129756-e45408e25250?q=80&w=1413&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						status: [
							{
								_id: 1,
								statusContent: "My name is Aman.",
								bgColor: "yellow",
							},
							{
								_id: 2,
								statusContent: "Abhinav is my classmate.",
								bgColor: "red",
							},
						],
					},
				]}
			/>
		</Stack>
	);
}
