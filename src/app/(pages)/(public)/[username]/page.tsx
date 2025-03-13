"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Stack,
	Typography,
} from "@mui/material";
import { PostCard } from "./_components";
import { useSelector, useDispatch } from "react-redux";
import { followUnfollowUserInState, handleDialog } from "@/redux/slices/user";
import Link from "next/link";
import { useFollowUnfollowUserMutation } from "@/redux/api-slices";
import { OverlayLogin } from "@/shared";
import { RootState } from "@/redux/store";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function User() {
	const params = useParams<{ username: string }>();
	const dispatch = useDispatch();
	if (!params?.username) return <div>User not found</div>;
	const username = decodeURIComponent(params.username);
	const [followUnfollowUser, { isLoading }] = useFollowUnfollowUserMutation();
	const { allUsersData, userData, isAuthenticated } = useSelector(
		(state: RootState) => state.User
	);
	const { postsData } = useSelector((state: RootState) => state.Post);

	const matchedUser = allUsersData.find((user) => user.username === username);
	const matchedPost = postsData.filter(
		(post) => post.creator?._id === matchedUser?._id
	);

	const handleFollowUnfollowUser = async () => {
		if (matchedUser?._id) {
			await followUnfollowUser(matchedUser?._id);
			dispatch(
				followUnfollowUserInState({
					_id: matchedUser._id,
					name: matchedUser.name || "",
					username: matchedUser.username || "",
					image: matchedUser.image || "",
				})
			);

			if (!userData.following?.find((user) => user._id === matchedUser?._id)) {
				const data = {
					senderId: userData._id,
					senderName: userData.name,
					senderImage: userData.image,
					receiverId: matchedUser._id,
					action: `follow`,
					link: `/${userData.username}`,
				};

				socket.off().emit("sendNotification", data);
			}
		}
	};
	return (
		<Box display={"flex"} flexDirection={"column"} width={"100%"} gap={3}>
			<OverlayLogin />
			<Stack direction={"row"} gap={2} alignItems={"center"}>
				<Avatar
					src={matchedUser?.image}
					sx={{ height: "7rem", width: "7rem" }}
				/>
				<Stack direction={"column"} gap={1}>
					<Typography variant="h5">{matchedUser?.name}</Typography>
					<Stack direction={"row"} gap={2}>
						<Stack direction={"column"} alignItems={"center"}>
							<Typography sx={{ opacity: 0.6 }} fontWeight={"bold"}>
								Posts
							</Typography>
							<Typography sx={{ opacity: 0.6 }}>
								{matchedUser?.posts?.length}
							</Typography>
						</Stack>
						<Stack direction={"column"} alignItems={"center"}>
							<Typography sx={{ opacity: 0.6 }} fontWeight={"bold"}>
								Followers
							</Typography>
							<Typography sx={{ opacity: 0.6 }}>
								{matchedUser?.followers?.length}
							</Typography>
						</Stack>
						<Stack direction={"column"} alignItems={"center"}>
							<Typography sx={{ opacity: 0.6 }} fontWeight={"bold"}>
								Following
							</Typography>
							<Typography sx={{ opacity: 0.6 }}>
								{matchedUser?.following?.length}
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
					{matchedUser?.username}
				</Typography>
			</Stack>
			<Stack direction={"row"} gap={2}>
				{isAuthenticated ? (
					<Button
						variant="contained"
						fullWidth
						onClick={handleFollowUnfollowUser}
					>
						{isLoading ? (
							<CircularProgress sx={{ color: "white" }} size={18} />
						) : userData.following?.find(
								(user) => user._id === matchedUser?._id
						  ) ? (
							"Following"
						) : (
							"Follow"
						)}
					</Button>
				) : (
					<Button
						variant="contained"
						fullWidth
						onClick={() => {
							dispatch(handleDialog(true));
						}}
					>
						Follow
					</Button>
				)}
				{isAuthenticated ? (
					<Link href={`/chats/${matchedUser?._id}`} style={{ width: "100%" }}>
						<Button variant="contained" fullWidth color="secondary">
							Message
						</Button>
					</Link>
				) : (
					<Button
						variant="contained"
						fullWidth
						color="secondary"
						onClick={() => {
							dispatch(handleDialog(true));
						}}
					>
						Message
					</Button>
				)}
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
					{matchedPost.length !== 0 ? (
						matchedPost.map((post, index) => {
							return (
								<PostCard
									key={index}
									postImage={post.post_image || ""}
									postId={post._id || ""}
								/>
							);
						})
					) : (
						<Typography>No posts yet</Typography>
					)}
				</Box>
			</Box>
		</Box>
	);
}
