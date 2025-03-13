import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

export function LeftMessage({
	message,
	time,
	image,
}: {
	message: string;
	time: string;
	image: string;
}) {
	return (
		<Stack
			alignSelf={"flex-start"}
			alignItems={"end"}
			direction={"row-reverse"}
			gap={1}
		>
			<Box
				bgcolor={"#06D001"}
				px={1}
				py={1}
				borderRadius={2}
				color={"white"}
				display={"flex"}
				flexDirection={"column"}
			>
				<Typography
					noWrap={false}
					sx={{
						whiteSpace: "normal", // Allows wrapping
						overflowWrap: "break-word", // Breaks words if needed
						wordBreak: "break-word", // Ensures long words break
					}}
				>
					{message}
				</Typography>
				<Typography
					alignSelf={"flex-end"}
					sx={{ fontSize: "0.7rem", opacity: 0.7 }}
				>
					{time}
				</Typography>
			</Box>
			<Avatar src={image} sx={{ height: "20px", width: "20px" }} />
		</Stack>
	);
}
