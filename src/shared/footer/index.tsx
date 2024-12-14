import React from "react";
import { Stack, IconButton, Avatar } from "@mui/material";
import { CustomToolTip } from "@/custom-components";
import {
	Home,
	Search,
	AddCircleOutlineSharp,
	ChatBubble,
} from "@mui/icons-material";

export function Footer() {
	const iconStyle = {
		fontSize: "2rem",
		transition: "all 0.5s",
		"&:hover": {
			color: "#86d4ff",
		},
	};
	return (
		<Stack
			position="fixed"
			direction={"row"}
			bottom={0}
			left="50%"
			spacing={10}
			alignItems={"center"}
			sx={{
				width: "auto",
				maxWidth: "100%",
				transform: "translateX(-50%)",
				padding: "10px",
			}}
		>
			<CustomToolTip title={"Home"} placement="top" arrow>
				<IconButton>
					<Home sx={iconStyle} />
				</IconButton>
			</CustomToolTip>
			<CustomToolTip title={"Search"} placement="top" arrow>
				<IconButton>
					<Search sx={iconStyle} />
				</IconButton>
			</CustomToolTip>
			<CustomToolTip title={"Create Post"} placement="top" arrow>
				<IconButton>
					<AddCircleOutlineSharp sx={iconStyle} />
				</IconButton>
			</CustomToolTip>
			<CustomToolTip title={"Chat"} placement="top" arrow>
				<IconButton>
					<ChatBubble sx={iconStyle} />
				</IconButton>
			</CustomToolTip>
			<CustomToolTip title={"Profile"} placement="top" arrow>
				<Avatar sx={{ cursor: "pointer" }} />
			</CustomToolTip>
		</Stack>
	);
}
