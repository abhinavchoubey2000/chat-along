import React from "react";
import { Stack, Avatar, Typography } from "@mui/material";
import Link from "next/link";

interface ChatsDataInterface {
	[id: string]: [];
}

export function UserCard({
	id,
	name,
	image,
	lastMessage,
	seen,
}: {
	id: string;
	name: string;
	image: string;
	lastMessage: string;
	seen: boolean;
}) {
	return (
		<Link
			href={`/chats/${id}`}
			style={{ textDecoration: "none", color: "black" }}
		>
			<Stack
				direction={"row"}
				alignItems={"center"}
				spacing={1}
				px={2}
				py={1}
				sx={{
					"&:hover": {
						bgcolor: "#ededed",
						transition: "all 0.3s",
						cursor: "pointer",
					},
				}}
			>
				<Avatar src={image} sx={{ height: "3rem", width: "3rem" }} />
				<Stack>
					<Typography>{name}</Typography>
					<Typography
						variant="caption"
						sx={{ opacity: 0.7 }}
						fontWeight={lastMessage === "Tap to chat" ? "" : seen ? "" : "bold"}
					>
						{lastMessage}
					</Typography>
				</Stack>
			</Stack>
		</Link>
	);
}
