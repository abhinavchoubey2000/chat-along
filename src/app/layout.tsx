import "dotenv/config";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import {
	StorePublicPosts,
	AddToDevice,
	StoreUserData,
	AskForNotification,
	MUIThemeProvider,
	StoreAllUsersData,
	ReceiveMessage,
	ReceiveNotification,
} from "./_components/client";
import { Container } from "@mui/material";
import "../globals.css";
import { ReduxProvider } from "@/redux/ReduxProvider";

export const metadata: Metadata = {
	title: "chatAlong - Discover and create your own journey",
	description: "A social media app for everyone",
	icons: [{ rel: "icon", type: "image/png", url: "/logo.png" }],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="manifest" href="/manifest.json" />
			</head>
			<body>
				<AppRouterCacheProvider>
					<ReduxProvider>
						<MUIThemeProvider>
							<main>
								<AddToDevice />
								<StoreUserData />
								<StorePublicPosts />
								<StoreAllUsersData />
								<ReceiveNotification />
								<ReceiveMessage />
								<Toaster />
								<Container
									maxWidth={"sm"}
									sx={{
										px: 0,
										pb: 7,
										overflow: "auto",
										height: "100vh",
										position: "relative",
										boxShadow: "0px 0px 2px 3px #00000021",
										overflowX: "hidden",
									}}
								>
									<AskForNotification />
									{children}
								</Container>
							</main>
						</MUIThemeProvider>
					</ReduxProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
