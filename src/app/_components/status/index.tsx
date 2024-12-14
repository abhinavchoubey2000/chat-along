import React from "react";
import { Stack } from "@mui/material";
import { MyStatus, UserStatus } from "./_components";

export function Status() {
	return (
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
						username: "ayushee",
						status: [
							{
								_id: 1,
								statusContent: "Hie I am ayushee.",
								bgColor: "red",
							},
							{
								_id: 2,
								statusContent: "Abhinav is my bestfriend.",
								bgColor: "yellow",
							},
						],
					},
					{
						username: "anshul",
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
						username: "aman",
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
