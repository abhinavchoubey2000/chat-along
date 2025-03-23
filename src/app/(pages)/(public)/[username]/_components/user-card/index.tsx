import React from "react";
import { Stack, Avatar, Typography } from "@mui/material";
import Link from "next/link";

export function UserCard({
	name,
	username,
	image,
}: {
	name: string;
	username: string;
	image: string;
}) {
	return (
		<Link
			href={`/${username}`}
			style={{ textDecoration: "none", color: "black" }}
		>
			<Stack
				width={"100%"}
				direction={"row"}
				alignItems={"center"}
				justifyContent={"space-between"}
				spacing={[0, 1]}
				px={[0, 2]}
				py={1}
				sx={{
					"&:hover": {
						bgcolor: "#ededed",
						transition: "all 0.3s",
						cursor: "pointer",
					},
				}}
			>
				<Stack direction={"row"} spacing={[1,3]} alignItems={"center"}>
					<Avatar src={image} sx={{ height: "3rem", width: "3rem" }} />
					<Stack>
						<Typography>{username}</Typography>
						<Typography variant="caption" sx={{ opacity: 0.7 }}>
							{name}
						</Typography>
					</Stack>
				</Stack>
			</Stack>
		</Link>
	);
}
