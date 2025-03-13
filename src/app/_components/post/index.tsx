"use client";
import { Container } from "@mui/material";
import React from "react";
import { PostCard } from "./_components";
import { OverlayLogin } from "@/shared";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function Post() {
	const { postsData } = useSelector((state: RootState) => state.Post);

	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				pb: 10,
			}}
		>
			<OverlayLogin />
			{postsData.map((post, index) => {
				return (
					<PostCard
						key={index}
						_id={post._id}
						creator={post.creator}
						likes={post.likes}
						comments={post.comments}
						caption={post.caption}
						post_image={post.post_image}
					/>
				);
			})}
		</Container>
	);
}
