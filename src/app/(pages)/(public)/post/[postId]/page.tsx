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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";

export default function UserPost() {
	const { postId } = useParams();
	const { postsData } = useSelector((state: RootState) => state.Post);
	const matchedPost = postsData.find((post) => post._id === postId);
	return (
		<Card sx={{ maxWidth: "100%", marginY: 3 }} raised>
			<CardHeader
				avatar={<Avatar src={matchedPost?.creator?.image.image_url} />}
				action={<PostOption />}
				title={
					<Link
						href={`/${matchedPost?.creator?.username}`}
						style={{ textDecoration: "none", color: "black" }}
					>
						{matchedPost?.creator?.name}
					</Link>
				}
				subheader={"1 Jan 2025"}
			/>
			<CardMedia
				component="img"
				width={300}
				height={500}
				image={matchedPost?.post_image?.image_url}
			/>
			<CardContent>
				<Typography variant="body2" sx={{ color: "black" }}>
					{matchedPost?.caption}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<LikeCommentButtonStack
					likes={matchedPost?.likes || []}
					comments={matchedPost?.comments || []}
					id={matchedPost?._id || ""}
					creatorId={matchedPost?.creator?._id || ""}
				/>
			</CardActions>
		</Card>
	);
}
