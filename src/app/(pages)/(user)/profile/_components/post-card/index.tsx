import { Avatar } from "@mui/material";
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
			<Avatar
				src={postImage}
				sx={{
					borderRadius: 2,
					width: ["6rem", "10rem"],
					height: ["8rem", "12rem"],
					objectFit: "contain",
				}}
			/>
		</Link>
	);
}
