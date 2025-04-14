"use client";

import React, { useState, useEffect } from "react";
import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	Avatar,
	CircularProgress,
	Container,
	Button,
	Stack,
} from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
	useEditCaptionMutation,
	useViewUserPostMutation,
} from "@/redux/api-slices/post";
import toast from "react-hot-toast";

export default function UserPost() {
	const { postId } = useParams<{ postId: string }>();
	const [viewUserPost, { isLoading }] = useViewUserPostMutation();
	const [editCaption, { isLoading: captionLoading }] = useEditCaptionMutation();
	const [post, setPost] = useState<PostInterface>({});
	const [newCaption, setNewCaption] = useState("");
	const router = useRouter();

	const fetchPost = async () => {
		const response = await viewUserPost(postId);
		setPost(response.data.data);
		setNewCaption(post.caption || "");
	};

	const handleUpdate = async () => {
		const response = await editCaption({ caption: newCaption, postId });
		if (!response.data.success) {
			return toast.error(response.data.message);
		}
		toast.success("Updated caption of this post.");
		window.location.href = `/post/${postId}`;
	};

	useEffect(() => {
		fetchPost();
	}, []);
	useEffect(() => {
		if (post?.caption) {
			setNewCaption(post.caption);
		}
	}, [post]);

	return isLoading ? (
		<Container
			maxWidth={"sm"}
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "90vh",
			}}
		>
			<CircularProgress sx={{ color: "blue" }} size={100} />
		</Container>
	) : (
		<Card sx={{ maxWidth: "100%", marginY: [0, 3] }} raised>
			<CardHeader
				avatar={<Avatar src={post?.creator?.image.image_url} />}
				title={
					<Link
						href={`/${post?.creator?.username}`}
						style={{ textDecoration: "none", color: "black" }}
					>
						{post?.creator?.name}
					</Link>
				}
				subheader={post.date}
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
				image={post?.post_image?.image_url}
			/>
			<CardContent>
				<textarea
					value={newCaption}
					rows={8}
					onChange={(e) => {
						setNewCaption(e.target.value);
					}}
					style={{
						width: "100%",
						outline: "none",
						borderRadius: 0,
						resize: "none",
						background: "transparent",
						padding: "10px 10px",
					}}
				></textarea>
				<Stack direction={"row"} spacing={2}>
					{captionLoading ? (
						<CircularProgress sx={{ color: "white" }} size={18} />
					) : (
						<Button
							disabled={captionLoading}
							color="secondary"
							onClick={handleUpdate}
						>
							Update
						</Button>
					)}

					<Button
						color="error"
						onClick={() => {
							router.back();
						}}
					>
						Cancel
					</Button>
				</Stack>
			</CardContent>
			<CardActions disableSpacing></CardActions>
		</Card>
	);
}
