"use client";
import { Favorite, ModeComment, SendOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
	useLikeUnlikePostMutation,
	useCommentPostMutation,
} from "@/redux/api-slices/post";
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
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { RootState } from "@/redux/store";
import { likeUnlikePostInState, commentPostInState } from "@/redux/slices/post";
import { handleDialog } from "@/redux/slices/user";

const socket = io("http://localhost:5000");

export function LikeCommentButtonStack({
	comments,
	likes,
	id,
	creatorId,
}: {
	comments: Array<PostCommentsInterface>;
	likes: Array<PostLikesInterface>;
	id: string;
	creatorId: string;
}) {
	const [isCommentOpen, setIsCommentOpen] = useState(false);
	const [comment, setComment] = useState("");
	const { userData, isAuthenticated } = useSelector(
		(state: RootState) => state.User
	);
	const [likeUnlikePost, { isLoading: isLoadingLikes }] =
		useLikeUnlikePostMutation();
	const [commentPost, { isLoading: isLoadingComments }] =
		useCommentPostMutation();
	const dispatch = useDispatch();

	const handleLike = async () => {
		if (isAuthenticated) {
			await likeUnlikePost(id);
			dispatch(
				likeUnlikePostInState({
					likesDetails: {
						_id: userData._id || "",
						name: userData.name || "",
						username: userData.username || "",
						image: userData.image || "",
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

				socket.off().emit("sendNotification", data);
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
			image: userData.image || "",
		};
		dispatch(
			commentPostInState({ commentDetails: { comment, userId }, postId: id })
		);
		setComment("");
		const data = {
			senderId: userData._id,
			senderName: userData.name,
			senderImage: userData.image,
			receiverId: creatorId,
			action: `comment`,
			link:`/post/${id}`
		};

		socket.off().emit("sendNotification", data);
	};

	return (
		<Stack direction={"column"} spacing={2} width={"100%"}>
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
					<Typography variant="caption" color="text.secondary">
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
						{comments.map((comment, index) => (
							<Stack
								key={index}
								direction="row"
								spacing={1}
								alignItems="center"
							>
								<Avatar
									src={comment.userId.image}
									alt={comment.userId.username}
									style={{ width: 40, height: 40 }}
								/>
								<Stack>
									<Link
										href={`/${comment.userId.username}`}
										style={{ textDecoration: "none", color: "black" }}
									>
										<Typography variant="subtitle2" fontWeight={"bold"}>
											{comment.userId.username}
										</Typography>
									</Link>
									<Typography variant="body2">{comment.comment}</Typography>
								</Stack>
							</Stack>
						))}
					</Stack>
					<Divider />
					{isAuthenticated ? (
						<Stack direction="row" spacing={2} alignItems="center">
							<Avatar
								src={userData.image}
								alt="Logged in user"
								style={{ width: 50, height: 50 }}
							/>
							<FormControl variant="outlined" fullWidth color="secondary">
								<InputLabel htmlFor="outlined-adornment-add-comment">
									Add a comment
								</InputLabel>
								<OutlinedInput
									id="outlined-adornment-add-comment"
									type={"text"}
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
