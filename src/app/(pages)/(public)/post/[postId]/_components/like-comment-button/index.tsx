"use client";
import { Favorite, ModeComment, SendOutlined } from "@mui/icons-material";
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

export function LikeCommentButtonStack({
	comments,
	likes,
}: {
	comments: Array<PostCommentsInterface>;
	likes: Array<PostLikesInterface>;
}) {
	const [liked, setLiked] = useState(false);
	const [isCommentOpen, setIsCommentOpen] = useState(false);
	const [comment, setComment] = useState("");

	const handleLike = () => {
		if (liked) {
			setLiked(false);
			likes.pop();
		} else {
			setLiked(true);
			likes.push({
				id: "1",
				username: "abh@12",
				name: "Abhinav Choubey;",
				image:
					"https://plus.unsplash.com/premium_photo-1673296129756-e45408e25250?q=80&w=1413&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			});
		}
	};

	const handleComment = () => {
		setIsCommentOpen(!isCommentOpen);
	};
	const handleCommentSubmit = () => {
		comments.push({
			user: {
				name: "Abhinav Choubey",
				id: "1",
				username: "abh@12",
				image:
					"https://images.unsplash.com/photo-1527073620320-77635188c627?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
			comment,
		});
		setComment("");
	};

	return (
		<Stack direction={"column"} spacing={2} width={"100%"}>
			<Stack direction={"row"} spacing={2}>
				<Stack direction={"column"} spacing={0} justifyContent={"center"}>
					<IconButton
						aria-label="Like"
						sx={{ color: liked ? "red" : "" }}
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
									src={comment.user.image}
									alt={comment.user.username}
									style={{ width: 40, height: 40 }}
								/>
								<Stack>
									<Link
										href={`/${comment.user.username}`}
										style={{ textDecoration: "none", color: "black" }}
									>
										<Typography variant="subtitle2" fontWeight={"bold"}>
											{comment.user.username}
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
