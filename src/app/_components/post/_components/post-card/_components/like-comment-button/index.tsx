"use client";
import {
	Favorite,
	ModeComment,
	SendOutlined,
	Delete,
} from "@mui/icons-material";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
	Avatar,
	IconButton,
	Stack,
	Typography,
	Divider,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	Dialog,
	DialogContent,
	Box,
} from "@mui/material";
import {
	useLikeUnlikePostMutation,
	useCommentPostMutation,
	useDeleteCommentMutation,
} from "@/redux/api-slices/post";
import Link from "next/link";
import React, { useState } from "react";
import { RootState } from "@/redux/store";
import {
	likeUnlikePostInState,
	commentPostInState,
	deleteCommentPostFromState,
} from "@/redux/slices/post";
import { handleDialog } from "@/redux/slices/user";
import { UserCard } from "./_components";
import { useSaveNotificationMutation } from "@/redux/api-slices";

const socket = io("https://chat-along-external-server.onrender.com/");

export function LikeCommentButtonStack({
	comments,
	likes,
	id,
	darkMode,
	creatorId,
}: {
	comments: Array<PostCommentsInterface>;
	likes: Array<PostLikesInterface>;
	id: string;
	creatorId: string;
	darkMode: boolean;
}) {
	const [isCommentOpen, setIsCommentOpen] = useState(false);
	const [isDialogOpened, setIsDialogOpened] = useState(false);
	const [comment, setComment] = useState("");
	const { userData, isAuthenticated } = useSelector(
		(state: RootState) => state.User
	);
	const [likeUnlikePost] = useLikeUnlikePostMutation();
	const [commentPost] = useCommentPostMutation();
	const [deleteComment] = useDeleteCommentMutation();
	const dispatch = useDispatch();
	const [saveNotification] = useSaveNotificationMutation();

	const handleLike = async () => {
		if (isAuthenticated) {
			await likeUnlikePost(id);
			dispatch(
				likeUnlikePostInState({
					likesDetails: {
						_id: userData._id || "",
						name: userData.name || "",
						username: userData.username || "",
						image: userData.image || { image_url: "", public_id: "" },
					},
					postId: id || "",
				})
			);
			if (!likes.find((like) => like?._id === userData?._id)) {
				const data = {
					senderId: userData._id,
					senderName: userData.name,
					senderImage: userData.image,
					receiverId: creatorId,
					action: `like`,
					link: `/post/${id}`,
				};
				if (userData._id !== creatorId) {
					socket.off().emit("sendNotification", data);
					await saveNotification({
						senderName: userData.name || "",
						image: userData.image || { image_url: "", public_id: "" },
						action: "like",
						link: `/post/${id}`,
						receiverId: creatorId,
					});
				}
			}
		} else {
			dispatch(handleDialog(true));
		}
	};

	const handleComment = () => {
		setIsCommentOpen(!isCommentOpen);
	};
	const handleCommentSubmit = async () => {
		await commentPost({ postId: id, comment });
		const userId = {
			_id: userData._id || "",
			name: userData.name || "",
			username: userData.username || "",
			image: userData.image || { image_url: "", public_id: "" },
		};
		dispatch(
			commentPostInState({ commentDetails: { comment, userId }, postId: id })
		);
		setComment("");

		if (creatorId !== userData._id) {
			const data = {
				senderId: userData._id,
				senderName: userData.name,
				senderImage: userData.image,
				receiverId: creatorId,
				action: `comment`,
				link: `/post/${id}`,
			};

			socket.off().emit("sendNotification", data);
			await saveNotification({
				senderName: userData.name || "",
				image: userData.image || { image_url: "", public_id: "" },
				action: "comment",
				link: `/post/${id}`,
				receiverId: creatorId,
			});
		}
	};
	const handleDeleteComment = async (commentId: string, postId: string) => {
		dispatch(deleteCommentPostFromState({ commentId, postId }));
		await deleteComment({ postId, commentId });
	};

	return (
		<Stack direction={"column"} spacing={2} width={"100%"}>
			<Dialog
				fullWidth
				open={isDialogOpened}
				onClose={() => {
					setIsDialogOpened(false);
				}}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					<Box height={"80vh"}>
						{likes.length === 0 ? (
							<Typography textAlign={"center"}>No likes yet</Typography>
						) : (
							likes?.map((user, index) => {
								return (
									<UserCard
										key={index}
										name={user.name}
										image={user.image.image_url}
										username={user.username}
									/>
								);
							})
						)}
					</Box>
				</DialogContent>
			</Dialog>
			<Stack direction={"row"} spacing={2}>
				<Stack direction={"column"} spacing={0} justifyContent={"center"}>
					<IconButton
						aria-label="Like"
						sx={{
							color: likes.find((like) => like?._id === userData?._id)
								? "red"
								: "",
						}}
						onClick={handleLike}
					>
						<Favorite />
					</IconButton>
					<Typography
						variant="caption"
						color="text.secondary"
						sx={{ cursor: "pointer" }}
						onClick={() => {
							setIsDialogOpened(true);
						}}
					>
						{`${likes.length} ${likes.length > 1 ? "Likes" : "Like"}`}
					</Typography>
				</Stack>
				<Stack direction={"column"} spacing={0} justifyContent={"center"}>
					<IconButton
						onClick={handleComment}
						aria-label="comment"
						sx={{ color: isCommentOpen ? "#06D001" : "" }}
					>
						<ModeComment />
					</IconButton>
					<Typography variant="caption" color="text.secondary">
						{comments.length} Comments
					</Typography>
				</Stack>
			</Stack>
			{isCommentOpen && (
				<Stack spacing={2} mt={2} width={"100%"}>
					<Divider />
					<Stack
						spacing={2}
						direction={"column-reverse"}
						height={"200px"}
						overflow={"auto"}
					>
						{comments.length === 0 ? (
							<Typography
								display={"flex"}
								justifyContent={"center"}
								alignItems={"center"}
							>
								This post have no comments yet
							</Typography>
						) : (
							comments.map((comment, index) => (
								<Stack
									key={index}
									direction="row"
									spacing={1}
									alignItems="center"
									justifyContent={"space-between"}
								>
									<Stack direction="row" spacing={1} alignItems="center">
										<Avatar
											src={comment.userId.image.image_url}
											alt={comment.userId.username}
											sx={{ width: [30, 40], height: [30, 40] }}
										/>
										<Stack>
											<Link
												href={`/${comment.userId.username}`}
												style={{
													textDecoration: "none",
													color: darkMode ? "white" : "black",
												}}
											>
												<Typography
													sx={{ fontSize: ["0.7rem", "0.8rem"] }}
													fontWeight={"bold"}
												>
													{comment.userId.username}
												</Typography>
											</Link>
											<Typography sx={{ fontSize: ["0.7rem", "0.8rem"] }}>
												{comment.comment}
											</Typography>
										</Stack>
									</Stack>
									{comment.userId._id === userData._id ? (
										<IconButton
											color="error"
											onClick={() => {
												handleDeleteComment(comment._id!, id);
											}}
										>
											<Delete />
										</IconButton>
									) : null}
								</Stack>
							))
						)}
					</Stack>
					<Divider />
					{isAuthenticated ? (
						<Stack direction="row" spacing={[1, 2]} alignItems="center">
							<Avatar
								src={userData.image?.image_url}
								alt="Logged in user"
								sx={{ width: [40, 50], height: [40, 50] }}
							/>
							<FormControl variant="outlined" fullWidth color="secondary">
								<InputLabel htmlFor="outlined-adornment-add-comment">
									Add a comment
								</InputLabel>
								<OutlinedInput
									id="outlined-adornment-add-comment"
									type={"text"}
									size="small"
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label={"add-comment"}
												onClick={handleCommentSubmit}
												edge="end"
											>
												<SendOutlined />
											</IconButton>
										</InputAdornment>
									}
									label="Add a comment"
								/>
							</FormControl>
						</Stack>
					) : null}
				</Stack>
			)}
		</Stack>
	);
}
