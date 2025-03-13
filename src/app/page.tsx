import React from "react";
import { Status, Post } from "./_components";
import { Footer, Header } from "@/shared";

function Home() {
	return (
		<>
			<Header />
			<Status />
			<Post/>
			<Footer />
		</>
	);
}

export default Home;
