import React from "react";
import { Status, Post } from "./_components";
import { Footer, Header } from "@/shared";
import { Box, Skeleton, Stack } from "@mui/material";

function Home() {
	return (
		<>
			<Header />
			<Status />
			<Post />
			<Footer />
		</>
	);
}

export default Home;
