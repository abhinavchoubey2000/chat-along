"use client";

import React from "react";
import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	Avatar,
	Typography,
} from "@mui/material";
import { LikeCommentButtonStack, PostOption } from "./_components";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function UserPost() {
	const { postId } = useParams<{ postId: string }>();
	const { postsData } = useSelector((state: RootState) => state.Post);
	const { darkMode } = useSelector((state: RootState) => state.User);
	const matchedPost = postsData.find((post) => post._id === postId);

	return (
		<Card sx={{ maxWidth: "100%", marginY: 3 }} raised>
			<CardHeader
				avatar={<Avatar src={matchedPost?.creator?.image.image_url} />}
				action={
					<PostOption
						id={matchedPost?._id || ""}
						darkMode
						image_public_id={matchedPost?.post_image?.public_id || ""}
					/>
				}
				title={
					<Link
						href={`/${matchedPost?.creator?.username}`}
						style={{
							textDecoration: "none",
							color: darkMode ? "white" : "black",
						}}
					>
						{matchedPost?.creator?.name}
					</Link>
				}
				subheader={matchedPost?.date}
			/>
			<CardMedia
				component="img"
				sx={{
					objectFit: "contain", // Ensures the actual size is preserved
					maxWidth: "100%", // Prevents overflow
					maxHeight: "60vh",
					display: "block", // Prevents extra space below images
					marginX: "auto", // Centers the image
				}}
				image={matchedPost?.post_image?.image_url}
			/>
			<CardContent>
				<Typography
					variant="body2"
					sx={{ color: darkMode ? "white" : "black" }}
				>
					{matchedPost?.caption}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<LikeCommentButtonStack
					likes={matchedPost?.likes || []}
					comments={matchedPost?.comments || []}
					id={matchedPost?._id || ""}
					darkMode
					creatorId={matchedPost?.creator?._id || ""}
				/>
			</CardActions>
		</Card>
	);
}
