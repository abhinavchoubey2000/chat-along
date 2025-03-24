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

export function PostCard({
	_id,
	creator,
	caption,
	post_image,
	comments,
	likes,
	darkMode,
	date,
}: PostInterface) {
	return (
		<Card sx={{ width: ["100%", "30rem"], marginY: 3 }} raised>
			<CardHeader
				avatar={
					<Link
						href={`/${creator?.username}`}
						style={{
							textDecoration: "none",
							color: darkMode ? "white" : "black",
						}}
					>
						<Avatar src={creator?.image.image_url} />
					</Link>
				}
				action={
					<PostOption
						id={_id || ""}
						darkMode
						image_public_id={post_image?.public_id || ""}
					/>
				}
				title={
					<Link
						href={`/${creator?.username}`}
						style={{
							textDecoration: "none",
							color: darkMode ? "white" : "black",
						}}
					>
						{creator?.name}
					</Link>
				}
				subheader={
					<Link
						href={`/${creator?.username}`}
						style={{
							textDecoration: "none",
							color: darkMode ? "white" : "black",
							opacity: 0.7,
						}}
					>
						{date}
					</Link>
				}
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
				image={post_image?.image_url}
			/>
			<CardContent>
				<Typography
					variant="body2"
					sx={{ color: darkMode ? "white" : "black" }}
				>
					{caption}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<LikeCommentButtonStack
					likes={likes || []}
					comments={comments || []}
					id={_id || ""}
					darkMode
					creatorId={creator?._id || ""}
				/>
			</CardActions>
		</Card>
	);
}
