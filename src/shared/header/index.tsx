"use server";
import React from "react";
import { cookies } from "next/headers";
import { Stack, IconButton, Button } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import Link from "next/link";
import { NotificationBadge } from "./_components";

export async function Header() {
	const callCookies = cookies();
	const cookie = (await callCookies).get("token")?.value;

	return (
		<Stack
			paddingY={1}
			paddingX={1}
			direction={"row"}
			justifyContent={"space-between"}
		>
			<Image src={Logo} alt="chatAlong logo" height={50} />
			{cookie ? (
				<NotificationBadge />
			) : (
				<Stack direction={"row"} spacing={1}>
					<Link href={"/login"}>
						<Button variant="contained" size={"small"}>
							Login
						</Button>
					</Link>
					<Link href={"/signup"}>
						<Button variant="outlined" size={"small"} color="secondary">
							Sign Up
						</Button>
					</Link>
				</Stack>
			)}
		</Stack>
	);
}
