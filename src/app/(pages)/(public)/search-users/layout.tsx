import { Footer, Header } from "@/shared";
import React from "react";

export default function SearchUsersLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
