import { Card } from "@mui/material";
import Link from "next/link";
import React from "react";

export function PostCard({
	postImage,
	postId,
}: {
	postImage: string;
	postId: string;
}) {
	return (
		<Link href={`/post/${postId}`}>
			<Card
				elevation={2}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: ["30vw","10vw"],
					height: ["30vh","30vh"],
					":hover":{
						transition:["none","all 0.5s"],
						transform:["none","scale(1.1)"]
					}
				}}
			>
				<img
					src={postImage}
					style={{
						borderRadius: 2,
						objectFit: "contain", // Keeps the image's aspect ratio
						maxWidth: "100%", // Ensures it fits within the card width
						maxHeight: "30vh", // Prevents very tall images
						display: "block",
					}}
				/>
			</Card>
		</Link>
	);
}
