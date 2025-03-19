import { Stack, Avatar, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export function NotificationCard({
	action,
	name,
	image,
	link,
}: {
	action: string;
	name: string;
	image: { image_url: string; public_id: string };
	link: string;
}) {
	let message;
	if (action === "like") {
		message = "liked your post.";
	} else if (action === "comment") {
		message = "commented on your post.";
	} else {
		message =
			"followed you. Visit to their profile and follow them back to be friends.";
	}

	return (
		<Link href={link} style={{ textDecoration: "none", color: "black" }}>
			<Stack direction={"row"} spacing={1} bgcolor={"#e6e6e6"} py={2} px={1}>
				<Avatar src={image.image_url||""} sx={{ width: 25, height: 25 }} />
				<Typography variant="body2" letterSpacing={1}>
					<b>{name}</b> {message}
				</Typography>
			</Stack>
		</Link>
	);
}
