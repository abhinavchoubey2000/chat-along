'use client'

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

export default function UserPost({ params }: { params: { postId: string } }) {
	const postId = params.postId;
	const {postsData} = useSelector((state:RootState)=>state.Post)
	const matchedPost = postsData.find((post) => post._id === postId);
	return (
		<Card sx={{ maxWidth: "100%", marginY: 3 }} raised>
			<CardHeader
				avatar={<Avatar src={matchedPost?.creator?.image} />}
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
				image={matchedPost?.post_image}
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
				/>
			</CardActions>
		</Card>
	);
}
