import React from "react";
import { Stack, IconButton } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import Image from "next/image";
import Logo from "../../../public/logo.png";

export function Header() {
	return (
		<Stack
			paddingY={1}
			paddingX={1}
			direction={"row"}
			justifyContent={"space-between"}
		>
			<Image src={Logo} alt="chatAlong logo" height={50} />
			<IconButton area-label={"Open Notifications"} size="large">
				<Notifications sx={{ fontSize: "1.5rem" }} />
			</IconButton>
		</Stack>
	);
}
