"use client";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { PostCard } from "./_components";
import { useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/redux/store";

export default function Profile() {
	const { userData } = useSelector((state: RootState) => state.User);

	return (
		<Box display={"flex"} flexDirection={"column"} width={"100%"} gap={3}>
			<Stack direction={"row"} gap={2} alignItems={"center"}>
				<Avatar src={userData.image} sx={{ height: "7rem", width: "7rem" }} />
				<Stack direction={"column"} gap={1}>
					<Typography variant="h5">{userData.name}</Typography>
					<Stack direction={"row"} gap={2}>
						<Stack direction={"column"} alignItems={"center"}>
							<Typography sx={{ opacity: 0.6 }} fontWeight={"bold"}>
								Posts
							</Typography>
							<Typography sx={{ opacity: 0.6 }}>
								{userData.posts?.length}
							</Typography>
						</Stack>
						<Stack direction={"column"} alignItems={"center"}>
							<Typography sx={{ opacity: 0.6 }} fontWeight={"bold"}>
								Followers
							</Typography>
							<Typography sx={{ opacity: 0.6 }}>
								{userData.followers?.length}
							</Typography>
						</Stack>
						<Stack direction={"column"} alignItems={"center"}>
							<Typography sx={{ opacity: 0.6 }} fontWeight={"bold"}>
								Following
							</Typography>
							<Typography sx={{ opacity: 0.6 }}>
								{userData.following?.length}
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
			<Stack direction={"row"} alignItems={"flex-end"}>
				<Typography fontWeight={"bold"} variant="h6" sx={{ opacity: 0.7 }}>
					#
				</Typography>
				<Typography fontStyle={"italic"} variant="h6">
					{userData.username}
				</Typography>
			</Stack>
			<Stack direction={"row"} gap={2}>
				<Link href={'/edit-profile'} style={{width:"100%"}}>
					<Button variant="contained" fullWidth>
						Edit profile
					</Button>
				</Link>
				<Button variant="contained" fullWidth>
					Share profile
				</Button>
			</Stack>
			<Box>
				{/* <Typography variant="h5">All Posts</Typography> */}
				<Box
					width={"100%"}
					display={"flex"}
					flexWrap={"wrap"}
					py={2}
					justifyContent={"center"}
					gap={1}
					flexDirection={"row-reverse"}
				>
					{userData.posts?.map((post, index) => {
						return (
							<PostCard
								key={index}
								postImage={post.post_image || ""}
								postId={post._id || ""}
							/>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
}
