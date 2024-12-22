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

export function PostCard({ postObject }: { postObject: PostInterface }) {
	return (
		<Card sx={{ maxWidth: "100%", marginY: 3 }} raised>
			<CardHeader
				avatar={<Avatar />}
				action={<PostOption />}
				title={postObject.name}
				subheader={postObject.date}
			/>
			<CardMedia component="img" width={400} image={postObject.image} />
			<CardContent>
				<Typography variant="body2" sx={{ color: "black" }}>
					{postObject.caption}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<LikeCommentButtonStack
					likes={postObject.likes}
					comments={postObject.comments}
				/>
			</CardActions>
		</Card>
	);
}
