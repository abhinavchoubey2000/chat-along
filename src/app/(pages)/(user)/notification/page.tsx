"use client";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { NotificationCard } from "./_components";
import { RootState } from "@/redux/store";
import { clearNotificationsInState } from "@/redux/slices/user";
import { useClearNotificationsMutation } from "@/redux/api-slices";

export default function Notification() {
	const { userData } = useSelector((state: RootState) => state.User);
	const dispatch = useDispatch();
	const [clearNotifications] = useClearNotificationsMutation();
	const handleClearNotifications = async () => {
		dispatch(clearNotificationsInState());
		await clearNotifications();
	};
	return (
		<>
			<Stack
				paddingY={1}
				paddingX={1}
				direction={"row"}
				alignItems={"center"}
				gap={2}
				width={"100%"}
			>
				<Link href={"/"}>
					<IconButton area-label={"Open Notifications"} size="large">
						<ArrowBack sx={{ fontSize: "1.5rem" }} />
					</IconButton>
				</Link>
				<Typography>Notifications</Typography>
			</Stack>
			<Box
				width={"100%"}
				height={"80vh"}
				overflow={"auto"}
				mt={1}
				sx={{ display: "flex", flexDirection: "column" }}
				gap={1}
			>
				{userData.notifications?.length === 0 ? (
					<Typography textAlign={"center"} sx={{ opacity: 0.7 }}>
						No notifications for now.
					</Typography>
				) : (
					userData.notifications?.map((notification, index) => {
						return (
							<NotificationCard
								key={index}
								action={notification.action}
								image={notification.image}
								name={notification.name}
								link={notification.link}
							/>
						);
					})
				)}
			</Box>
			<Button onClick={handleClearNotifications} size="small" color="error">
				Clear all
			</Button>
		</>
	);
}
