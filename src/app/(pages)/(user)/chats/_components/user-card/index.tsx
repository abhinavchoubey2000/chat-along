import React from "react";
import { Stack, Avatar, Typography } from "@mui/material";
import Link from "next/link";

export function UserCard({
	id,
	name,
	time,
	image,
	lastMessage,
	seen,
	darkMode,
}: {
	id: string;
	name: string;
	time: string;
	image: string;
	lastMessage: string;
	seen: boolean;
	darkMode: boolean;
}) {
	return (
		<Link
			href={`/chats/${id}`}
			style={{ textDecoration: "none", color: darkMode ? "white" : "black" }}
		>
			<Stack
				direction={"row"}
				justifyContent={"space-between"}
				alignItems={"center"}
				spacing={1}
				px={2}
				py={1}
				sx={{
					"&:hover": {
						bgcolor: darkMode ? "black" : "#ededed",
						transition: "all 0.3s",
						cursor: "pointer",
					},
				}}
			>
				<Stack direction={"row"} spacing={1}>
					<Avatar
						src={image}
						sx={{ height: ["2rem", "3rem"], width: ["2rem", "3rem"] }}
					/>
					<Stack>
						<Typography sx={{ fontSize: ["0.8rem", "1rem"] }}>
							{name}
						</Typography>
						<Typography
							sx={{ opacity: 0.7, fontSize: ["0.8rem", "1rem"] }}
							fontWeight={
								lastMessage === "Tap to chat" ? "" : seen ? "" : "bold"
							}
						>
							{lastMessage}
						</Typography>
					</Stack>
				</Stack>
				<Typography variant="caption" sx={{opacity:0.7}} alignSelf={"end"}>{time}</Typography>
			</Stack>
		</Link>
	);
}
