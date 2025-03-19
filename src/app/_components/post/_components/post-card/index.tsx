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
	date,
}: PostInterface) {
	return (
		<Card sx={{ width: ["100%","30rem"], marginY: 3 }} raised>
			<CardHeader
				avatar={<Avatar src={creator?.image.image_url} />}
				action={
					<PostOption
						id={_id || ""}
						image_public_id={post_image?.public_id || ""}
					/>
				}
				title={
					<Link
						href={`/${creator?.username}`}
						style={{ textDecoration: "none", color: "black" }}
					>
						{creator?.name}
					</Link>
				}
				subheader={date}
			/>
			<CardMedia
				component="img"
				width={200}
				height={400}
				image={post_image?.image_url}
			/>
			<CardContent>
				<Typography variant="body2" sx={{ color: "black" }}>
					{caption}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<LikeCommentButtonStack
					likes={likes || []}
					comments={comments || []}
					id={_id || ""}
					creatorId={creator?._id || ""}
				/>
			</CardActions>
		</Card>
	);
}
