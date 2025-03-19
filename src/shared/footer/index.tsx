"use client";
import React from "react";
import { Stack, IconButton, Avatar, Badge } from "@mui/material";
import { CustomToolTip } from "@/custom-components";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
	Home,
	Search,
	AddCircleOutlineSharp,
	ChatBubble,
} from "@mui/icons-material";
import { RootState } from "@/redux/store";
import { handleDialog } from "@/redux/slices/user";

export function Footer() {
	const { userData, isAuthenticated } = useSelector(
		(state: RootState) => state.User
	);
	const dispatch = useDispatch();
	
	const iconStyle = {
		fontSize: ["1.5rem","2rem"],
		transition: "all 0.5s",
		"&:hover": {
			color: "#046af2",
		},
	};
	return (
		<Stack
			zIndex={100}
			position="fixed"
			direction={"row"}
			bottom={0}
			left="50%"
			spacing={[4, 10]}
			alignItems={"center"}
			justifyContent={"space-between"}
			bgcolor={"white"}
			sx={{
				width: ["100%", "auto"],
				maxWidth: "100%",
				transform: "translateX(-50%)",
				padding: "10px",
			}}
		>
			<CustomToolTip title={"Home"} placement="top" arrow>
				<Link href={"/"}>
					<IconButton>
						<Home sx={iconStyle} />
					</IconButton>
				</Link>
			</CustomToolTip>
			<CustomToolTip title={"Search"} placement="top" arrow>
				<Link href={"/search-users"}>
					<IconButton>
						<Search sx={iconStyle} />
					</IconButton>
				</Link>
			</CustomToolTip>
			<CustomToolTip title={"Create Post"} placement="top" arrow>
				{isAuthenticated ? (
					<Link href={"/create-post"}>
						<IconButton>
							<AddCircleOutlineSharp sx={iconStyle} />
						</IconButton>
					</Link>
				) : (
					<IconButton
						onClick={() => {
							dispatch(handleDialog(true));
						}}
					>
						<AddCircleOutlineSharp sx={iconStyle} />
					</IconButton>
				)}
			</CustomToolTip>
			<CustomToolTip title={"Chat"} placement="top" arrow>
				{isAuthenticated ? (
					<Link href={"/chats"}>
						<IconButton>
							<ChatBubble sx={iconStyle} />
						</IconButton>
					</Link>
				) : (
					<IconButton
						onClick={() => {
							dispatch(handleDialog(true));
						}}
					>
						<Badge variant="dot" invisible={true} color="secondary">
							<ChatBubble sx={iconStyle} />
						</Badge>
					</IconButton>
				)}
			</CustomToolTip>
			<CustomToolTip title={"Profile"} placement="top" arrow>
				{isAuthenticated ? (
					<Link href={"/profile"}>
						<Avatar
							src={userData?.image?.image_url || ""}
							sx={{ cursor: "pointer", height: [28, 38], width: [28, 38] }}
						/>
					</Link>
				) : (
					<Avatar
						onClick={() => {
							dispatch(handleDialog(true));
						}}
						src={userData?.image?.image_url || ""}
						sx={{ cursor: "pointer", height: [28, 38], width: [28, 38] }}
					/>
				)}
			</CustomToolTip>
		</Stack>
	);
}
