import React from "react";
import { Stack, Avatar, Typography } from "@mui/material";
import Link from "next/link";

export function UserCard({
	name,
	username,
	image,
	loggedInUserId,
	followersArray,
}: {
	loggedInUserId: string;
	followersArray: Array<FollowersInterface>;
	name: string;
	username: string;
	image: string;
}) {
	const haveFollowed = followersArray.find(
		(user) => user._id === loggedInUserId
	);
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
				<Stack direction={"row"} spacing={1}>
					<Avatar src={image} sx={{ height: "3rem", width: "3rem" }} />
					<Stack>
						<Typography>{username}</Typography>
						<Typography variant="caption" sx={{ opacity: 0.7 }}>
							{name}
						</Typography>
					</Stack>
				</Stack>
				{haveFollowed ? (
					<Typography
						sx={{ opacity: 0.7 }}
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						gap={1}
						variant="button"
						justifySelf={"end"}
						color="secondary"
					>
						<Typography variant="h4">&bull;</Typography> Following
					</Typography>
				) : null}
			</Stack>
		</Link>
	);
}
