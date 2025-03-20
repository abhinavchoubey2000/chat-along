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
import {
	useFollowUnfollowUserMutation,
	useSaveNotificationMutation,
} from "@/redux/api-slices";
import { OverlayLogin } from "@/shared";
import { RootState } from "@/redux/store";
import io from "socket.io-client";

const socket = io("https://chat-along-external-server.onrender.com/");

export default function User() {
	const params = useParams<{ username: string }>();
	const dispatch = useDispatch();
	const [followUnfollowUser, { isLoading }] = useFollowUnfollowUserMutation();
	const [saveNotification] = useSaveNotificationMutation();
	const { allUsersData, userData, isAuthenticated } = useSelector(
		(state: RootState) => state.User
	);
	const { postsData } = useSelector((state: RootState) => state.Post);
	if (!params?.username) return <div>User not found</div>;
	const username = decodeURIComponent(params.username);
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
					image: matchedUser.image || { image_url: "", public_id: "" },
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
				await saveNotification({
					senderName: userData.name || "",
					image: userData.image || { image_url: "", public_id: "" },
					action: "follow",
					link: `/${userData.username}`,
					receiverId: matchedUser._id,
				});
			}
		}
	};
	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			width={"100%"}
			gap={3}
			px={[1, 0]}
		>
			<OverlayLogin />
			<Stack direction={"row"} gap={2} alignItems={"center"}>
				<Avatar
					src={matchedUser?.image?.image_url}
					sx={{ height: ["5rem", "7rem"], width: ["5rem", "7rem"] }}
				/>
				<Stack direction={"column"} gap={[0, 1]}>
					<Typography sx={{ fontSize: ["1.5rem", "2rem"] }}>
						{matchedUser?.name}
					</Typography>
					<Stack direction={"row"} gap={2}>
						<Stack direction={"column"} alignItems={"center"}>
							<Typography
								sx={{ opacity: 0.6, fontSize: ["0.8rem", "1rem"] }}
								fontWeight={"bold"}
							>
								Posts
							</Typography>
							<Typography sx={{ opacity: 0.6, fontSize: ["0.8rem", "1rem"] }}>
								{matchedUser?.posts?.length}
							</Typography>
						</Stack>
						<Stack direction={"column"} alignItems={"center"}>
							<Typography
								sx={{ opacity: 0.6, fontSize: ["0.8rem", "1rem"] }}
								fontWeight={"bold"}
							>
								Followers
							</Typography>
							<Typography sx={{ opacity: 0.6, fontSize: ["0.8rem", "1rem"] }}>
								{matchedUser?.followers?.length}
							</Typography>
						</Stack>
						<Stack direction={"column"} alignItems={"center"}>
							<Typography
								sx={{ opacity: 0.6, fontSize: ["0.8rem", "1rem"] }}
								fontWeight={"bold"}
							>
								Following
							</Typography>
							<Typography sx={{ opacity: 0.6, fontSize: ["0.8rem", "1rem"] }}>
								{matchedUser?.following?.length}
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
			<Stack direction={"row"} alignItems={"flex-end"}>
				<Typography
					fontWeight={"bold"}
					sx={{ opacity: 0.7, fontSize: ["1rem", "1.4rem"] }}
				>
					#
				</Typography>
				<Typography fontStyle={"italic"} sx={{ fontSize: ["1rem", "1.4rem"] }}>
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
									postImage={post.post_image?.image_url || ""}
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
