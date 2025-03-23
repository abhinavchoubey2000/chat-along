"use client";

import { Notifications } from "@mui/icons-material";
import { IconButton, Badge } from "@mui/material";
import { useSelector } from "react-redux";
import Link from "next/link";
import React from "react";
import { RootState } from "@/redux/store";

export function NotificationBadge() {
	const { userData } = useSelector((state: RootState) => state.User);
	return (
		<Link href={"/notification"}>
			<IconButton area-label={"Open Notifications"} size="large">
				<Badge badgeContent={userData.notifications?.length} color="secondary">
					<Notifications sx={{ fontSize: "1.5rem" }} />
				</Badge>
			</IconButton>
		</Link>
	);
}
