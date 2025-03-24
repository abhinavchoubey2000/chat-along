import {
	Avatar,
	Box,
	Dialog,
	DialogContent,
	DialogContentText,
	Stack,
	// Typography,
} from "@mui/material";
import React, { useState } from "react";

export function RightImageMessage({
	imageMessage,
	// time,
	image,
}: {
	imageMessage: string;
	time: string;
	image: string;
}) {
	const [imageDialogOpened, setImageDialogOpened] = useState(false);
	return (
		<Stack
			alignSelf={"flex-end"}
			alignItems={"end"}
			onClick={() => {
				setImageDialogOpened(true);
			}}
			direction={"row"}
			gap={1}
		>
			<Dialog
				open={imageDialogOpened}
				onClose={() => {
					setImageDialogOpened(false);
				}}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<img src={imageMessage} alt="" />
					</DialogContentText>
				</DialogContent>
			</Dialog>
			<Box color={"white"} display={"flex"} flexDirection={"column"}>
				<img
					src={imageMessage}
					alt="Chat image"
					style={{
						objectFit: "contain", // Keeps the image's aspect ratio
						maxWidth: "100%", // Ensures it fits within the card width
						maxHeight: "38vh", // Prevents very tall images
						borderRadius: 10,
						border: "none",
						display: "block",
					}}
				/>
				{/* <Typography
					alignSelf={"flex-end"}
					sx={{ fontSize: ["0.6rem", "0.7rem"], opacity: 0.7 }}
				>
					{time}
				</Typography> */}
			</Box>
			<Avatar
				src={image}
				sx={{ height: ["1rem", "1.5rem"], width: ["1rem", "1.5rem"] }}
			/>
		</Stack>
	);
}
