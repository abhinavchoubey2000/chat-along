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
				<Stack direction={"row"} spacing={1} alignItems={"center"}>
					<Avatar
						src={image}
						sx={{ height: ["2rem", "3rem"], width: ["2rem", "3rem"] }}
					/>
					<Stack>
						<Typography sx={{ fontSize: ["0.8rem", "1rem"] }}>
							{username}
						</Typography>
						<Typography
							variant="caption"
							sx={{ opacity: 0.7, fontSize: ["0.8rem", "1rem"] }}
						>
							{name}
						</Typography>
					</Stack>
				</Stack>
				{haveFollowed ? (
					<Typography
						sx={{ opacity: 0.7, fontSize: ["0.8rem", "1rem"] }}
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						gap={1}
						variant="button"
						justifySelf={"end"}
						color="secondary"
					>
						<Typography sx={{ fontSize: ["1.5rem", "2rem"] }}>
							&bull;
						</Typography>{" "}
						Following
					</Typography>
				) : null}
			</Stack>
		</Link>
	);
}
