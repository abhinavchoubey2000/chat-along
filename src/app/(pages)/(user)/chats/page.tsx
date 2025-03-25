"use client";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import React from "react";
import { UserCard } from "./_components";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";
import { RootState } from "@/redux/store";

export default function Chats() {
	const { userData, allUsersData } = useSelector(
		(state: RootState) => state.User
	);
	let chatLastMessage = "";
	let lastMessageTime = "";
	let seen = false;

	console.log(Object.entries(userData.chats || {}));
	return (
		<>
			<Stack
				paddingY={[0, 1]}
				paddingX={1}
				direction={"row"}
				position={"fixed"}
				bgcolor={userData.settings?.darkMode ? "#121212" : "white"}
				alignItems={"center"}
				gap={2}
				width={"100%"}
			>
				<Link href={"/"}>
					<IconButton area-label={"Open Notifications"} size="large">
						<ArrowBack sx={{ fontSize: "1.5rem" }} />
					</IconButton>
				</Link>
				<Typography>Chats</Typography>
			</Stack>
			<Box
				pt={[5, 7]}
				width={"100%"}
				height={"80vh"}
				overflow={"auto"}
				mt={1}
				sx={{ display: "flex", flexDirection: "column" }}
			>
				{Object.entries(userData.chats || {})?.length <= 1 ? (
					<Typography textAlign={"center"} px={2}>
						You dont have any friends for now. Follow them to send them message
						from their profile.
					</Typography>
				) : (
					Object.entries(userData.chats || {}).map((user, index) => {
						if (!user || user[1].length === 0 || !user[0]) return null;
						lastMessageTime = userData?.chats?.[user[0]]
							? userData?.chats[user[0]][userData?.chats[user[0]].length - 1]
									?.time
							: "";

						chatLastMessage = userData?.chats?.[user[0] || ""]
							? userData?.chats[user[0] || ""][
									userData?.chats[user[0] || ""]?.length - 1
							  ].name === userData.name
								? userData?.chats[user[0]][userData?.chats[user[0]].length - 1]
										?.message !== ""
									? `You: ${
											userData?.chats[user[0]][
												userData?.chats[user[0]].length - 1
											]?.message
									  }`
									: "You sent an image"
								: userData?.chats[user[0]][userData?.chats[user[0]].length - 1]
										?.message !== ""
								? userData?.chats[user[0]][userData?.chats[user[0]].length - 1]
										?.message
								: "sent an image"
							: "Tap to chat";

						seen = userData?.chats?.[user[0]]
							? userData?.chats[user[0]][userData?.chats[user[0]].length - 1]
									?.seen
							: false;

						return (
							<UserCard
								key={index}
								darkMode={userData.settings?.darkMode || false}
								id={user[0]}
								name={
									allUsersData.find((userr) => userr._id === user[0])?.name ||
									""
								}
								image={
									allUsersData.find((userr) => userr._id === user[0])?.image
										?.image_url || ""
								}
								lastMessage={chatLastMessage}
								seen={seen}
								time={lastMessageTime}
							/>
						);
					})
				)}
			</Box>
		</>
	);
}
