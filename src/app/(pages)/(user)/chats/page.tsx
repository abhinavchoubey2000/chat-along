"use client";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import React from "react";
import { UserCard } from "./_components";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";
import { RootState } from "@/redux/store";

export default function Chats() {
	const { userData, chats } = useSelector((state: RootState) => state.User);
	let chatLastMessage = "";
	let seen = false;

	return (
		<>
			<Stack
				paddingY={1}
				paddingX={1}
				direction={"row"}
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
				width={"100%"}
				height={"80vh"}
				overflow={"auto"}
				mt={1}
				sx={{ display: "flex", flexDirection: "column" }}
			>
				{userData.following?.length === 0
					? "You dont have any friends for now. Follow them to add and chat"
					: userData?.following?.map((user, index) => {
							chatLastMessage = chats[user._id]
								? chats[user._id][chats[user._id].length - 1].name === "sender"
									? `You: ${
											chats[user._id][chats[user._id].length - 1].message
									  }`
									: chats[user._id][chats[user._id].length - 1].message
								: "Tap to chat";

							seen = chats[user._id]
								? chats[user._id][chats[user._id].length - 1].seen
								: false;
							return (
								<UserCard
									key={index}
									id={user._id}
									name={user.name}
									image={user.image}
									lastMessage={chatLastMessage}
									seen={seen}
								/>
							);
					  })}
			</Box>
		</>
	);
}
