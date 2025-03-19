import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

export function RightMessage({
	message,
	time,
	image,
}: {
	message: string;
	time: string;
	image: string;
}) {
	return (
		<Stack alignSelf={"flex-end"} alignItems={"end"} direction={"row"} gap={1}>
			<Box
				bgcolor={"#046af2"}
				px={1}
				py={1}
				borderRadius={2}
				color={"white"}
				display={"flex"}
				flexDirection={"column"}
				flexWrap={"wrap"}
			>
				<Typography
					noWrap={false}
					sx={{
						whiteSpace: "normal",
						overflowWrap: "break-word",
						wordBreak: "break-word",
						fontSize: ["0.6rem", "1rem"],
					}}
				>
					{message}
				</Typography>
				<Typography
					alignSelf={"flex-end"}
					sx={{ fontSize: ["0.6rem", "0.7rem"], opacity: 0.7 }}
				>
					{time}
				</Typography>
			</Box>
			<Avatar
				src={image}
				sx={{ height: ["1rem", "1.5rem"], width: ["1rem", "1.5rem"] }}
			/>
		</Stack>
	);
}
