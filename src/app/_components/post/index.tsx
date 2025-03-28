"use client";
import { CircularProgress, Container } from "@mui/material";
import React from "react";
import { PostCard } from "./_components";
import { OverlayLogin } from "@/shared";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function Post() {
	const { postsData } = useSelector((state: RootState) => state.Post);
	const { loading, userData } = useSelector((state: RootState) => state.User);

	return loading ? (
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
						darkMode={userData.settings?.darkMode}
						creator={post.creator}
						likes={post.likes}
						comments={post.comments}
						caption={post.caption}
						post_image={post.post_image}
						date={post.date}
					/>
				);
			})}
		</Container>
	);
}
