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
import React, { useState } from "react";

export function LikeCommentButtonStack({
	comments,
	likes,
}: {
	comments: Array<PostCommentsInterface>;
	likes: Array<number>;
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
			likes.push(1);
		}
	};

	const handleComment = () => {
		setIsCommentOpen(!isCommentOpen);
	};
	const handleCommentSubmit = () => {
		// Add comment to the comments array
		console.log(comment);
		comments.push({
			userId: 1,
			username: "abhi.1231",
			image: "",
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
					<Stack spacing={2} direction={"column-reverse"} height={"200px"} overflow={"auto"}>
						{comments.map((comment, index) => (
							<Stack
								key={index}
								direction="row"
								spacing={1}
								alignItems="center"
							>
								<Avatar
									src={comment.image}
									alt={comment.username}
									style={{ width: 40, height: 40 }}
								/>
								<Stack>
									<Typography variant="subtitle2" fontWeight={"bold"}>
										{comment.username}
									</Typography>
									<Typography variant="body2">{comment.comment}</Typography>
								</Stack>
							</Stack>
						))}
					</Stack>
					<Stack direction="row" spacing={2} alignItems="center">
						<Avatar
							src=""
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
