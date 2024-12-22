import { Container } from "@mui/material";
import React from "react";
import { PostCard } from "./_components";

export function Post() {
	const postDataObject: Array<PostInterface> = [
		{
			id: 2,
			name: "Ayushee",
			caption: "This is the first post of ayushee",
			comments: [
				{
					userId: 1,
					username: "abhi.1231",
					image: "",
					comment: "Congratulations ayushee.",
				},
				{
					userId: 3,
					username: "ansh.ul2002",
					image: "",
					comment: "Sahi hai yrr alag hi.",
				},
			],
			likes: [1, 3, 2, 4, 5],
			date: "August 19, 2025",
			image:
				"https://images.unsplash.com/photo-1515041219749-89347f83291a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			id: 3,
			name: "Anshul singh",
			caption: "Live like a good boy.",
			comments: [
				{
					userId: 2,
					username: "ay_ushee.990",
					image: "",
					comment: "Yeah!",
				},
				{
					userId: 1,
					username: "abhi.1231",
					image: "",
					comment: "Kya baat h bc.",
				},
				{
					userId: 5,
					username: "iamKunal.21",
					image: "",
					comment: "Sahi hai",
				},
				{
					userId: 4,
					username: "singhalAman232",
					image: "",
					comment: "Nice pic",
				},
			],
			likes: [1, 2, 5],
			date: "January 23, 2025",
			image:
				"https://images.unsplash.com/photo-1604883781245-0aca44fff711?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			id: 5,
			name: "Kunal Gupta",
			caption: "Eat-Sleep-Party-Repeat",
			comments: [
				{
					userId: 1,
					username: "abhi.1231",
					image: "",
					comment: "Kunal Bhai bolte!!!",
				},
			],
			likes: [1, 3, 2, 34, 5, 12],
			date: "November 20, 2025",
			image:
				"https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
	];

	return (
		<Container
			sx={{ display: "flex", flexDirection: "column", alignItems: "center", pb:10 }}
		>
			{postDataObject.map((post, index) => {
				return <PostCard key={index} postObject={post} />;
			})}
		</Container>
	);
}
