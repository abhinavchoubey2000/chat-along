"use client";
import {
	Favorite,
	ModeComment,
	SendOutlined,
	Delete,
} from "@mui/icons-material";
import io from "socket.io-client";
import { UserCard } from "./_components";
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
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { RootState } from "@/redux/store";
import {
	useCommentPostMutation,
	useLikeUnlikePostMutation,
	useDeleteCommentMutation,
} from "@/redux/api-slices/post";
import {
	commentPostInState,
	likeUnlikePostInState,
	deleteCommentPostFromState,
} from "@/redux/slices/post";
import { useSaveNotificationMutation } from "@/redux/api-slices";
import { handleDialog } from "@/redux/slices/user";

const socket = io("https://chat-along-external-server.onrender.com/");

export function LikeCommentButtonStack({
	comments,
	likes,
	darkMode,
	id,
	creatorId,
}: {
	comments: Array<PostCommentsInterface>;
	likes: Array<PostLikesInterface>;
	id: string;
	darkMode: boolean;
	creatorId: string;
}) {
	const [isCommentOpen, setIsCommentOpen] = useState(false);
	const [isDialogOpened, setIsDialogOpened] = useState(false);
	const [comment, setComment] = useState("");
	const { isAuthenticated, userData } = useSelector(
		(state: RootState) => state.User
	);
	const dispatch = useDispatch();
	const [likeUnlikePost, { isLoading: likeLoading }] =
		useLikeUnlikePostMutation();
	const [saveNotification] = useSaveNotificationMutation();
	const [commentPost, { isLoading: commentLoading }] = useCommentPostMutation();
	const [deleteComment] = useDeleteCommentMutation();

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
			if (creatorId !== userData._id) {
				if (!likes.find((like) => like?._id === userData?._id)) {
					const data = {
						senderId: userData._id,
						senderName: userData.name,
						senderImage: userData.image,
						receiverId: creatorId,
						action: `like`,
						link: `/post/${id}`,
					};

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

		if (userData._id !== creatorId) {
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
		dispatch(deleteCommentPostFromState({ postId, commentId }));
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
						disabled={likeLoading}
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
						{likes.length} Likes
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
									justifyContent={"space-between"}
									alignItems="center"
								>
									<Stack direction="row" spacing={1} alignItems="center">
										<Avatar
											src={comment.userId.image.image_url}
											alt={comment.userId.username}
											style={{ width: 40, height: 40 }}
										/>
										<Stack>
											<Link
												href={`/${comment.userId.username}`}
												style={{
													textDecoration: "none",
													color: darkMode ? "white" : "black",
												}}
											>
												<Typography variant="subtitle2" fontWeight={"bold"}>
													{comment.userId.username}
												</Typography>
											</Link>
											<Typography variant="body2">{comment.comment}</Typography>
										</Stack>
									</Stack>
									{userData._id === comment.userId._id ? (
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
												disabled={commentLoading}
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
