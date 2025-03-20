"use client";
import { Favorite, ModeComment, SendOutlined } from "@mui/icons-material";
import io from "socket.io-client";
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
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { RootState } from "@/redux/store";
import {
	useCommentPostMutation,
	useLikeUnlikePostMutation,
} from "@/redux/api-slices/post";
import { commentPostInState, likeUnlikePostInState } from "@/redux/slices/post";
import { useSaveNotificationMutation } from "@/redux/api-slices";
import { handleDialog } from "@/redux/slices/user";

const socket = io("https://chat-along-external-server.onrender.com/", {
	transports: ["websocket", "polling"],
});

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
	const { isAuthenticated, userData } = useSelector(
		(state: RootState) => state.User
	);
	const dispatch = useDispatch();
	const [likeUnlikePost] = useLikeUnlikePostMutation();
	const [saveNotification] = useSaveNotificationMutation();
	const [commentPost] = useCommentPostMutation();

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

				socket.off().emit("sendNotification", data);
				await saveNotification({
					senderName: userData.name || "",
					image: userData.image || { image_url: "", public_id: "" },
					action: "like",
					link: `/post/${id}`,
					receiverId: creatorId,
				});
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
						{comments.map((comment, index) => (
							<Stack
								key={index}
								direction="row"
								spacing={1}
								alignItems="center"
							>
								<Avatar
									src={comment.userId.image.image_url}
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
					<Stack direction="row" spacing={2} alignItems="center">
						<Avatar
							src="https://images.unsplash.com/photo-1527073620320-77635188c627?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
				</Stack>
			)}
		</Stack>
	);
}
