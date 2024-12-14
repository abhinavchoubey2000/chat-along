"use client";
import React, { useState } from "react";
import {
	Stack,
	Avatar,
	Typography,
	Backdrop,
	Fab,
	Pagination,
} from "@mui/material";
import { Close } from "@mui/icons-material";

export function MyStatus({ statusArray }: MyStatusPropsInterface) {
	// State for opening and closing status backgrop status window
	const [open, setOpen] = useState(false);
	// State for the index of pagination
	const [statusIndex, setStatusIndex] = useState(1);
	//Function for handling the pagination button next or previous
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setStatusIndex(value);
	};
	//Function for closing the backdrop status window
	const handleClose = () => {
		setOpen(false);
	};
	//Fuction for opening the backdrop status window
	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<>
			<Stack
				onClick={handleOpen}
				alignItems={"center"}
				sx={{ cursor: "pointer" }}
			>
				<Avatar
					sx={{
						height: 70,
						width: 70,
						border: statusArray.length === 0 ? "0" : "2px solid #86d4ff",
					}}
				/>
				<Typography textAlign={"center"} variant="caption">
					My Status
				</Typography>
			</Stack>
			{/* Backdrop component where the status will be viewed */}
			<Backdrop
				sx={(theme) => ({
					color: "#fff",
					zIndex: theme.zIndex.drawer + 1,
					width: "44%",
					height: "100%",
					left: "26.8%",
					bgcolor: `${statusArray[statusIndex - 1].bgColor}`,
					backdropFilter: "blur(2px)",
				})}
				open={open}
			>
				<Stack position={"fixed"} top={0}>
					<Fab
						onClick={handleClose}
						sx={{
							position: "fixed",
							top: 5,
							right: 5,
							boxShadow: "none",
							bgcolor: "transparent",
						}}
						size="small"
						color="default"
					>
						<Close fontSize="small" />
					</Fab>
					<Pagination
						count={statusArray.length}
						page={statusIndex}
						color="primary"
						onChange={handleChange}
						size="large"
					/>
				</Stack>
				<Typography variant="h2" textAlign={"center"}>
					{statusArray[statusIndex - 1].statusContent}
				</Typography>
			</Backdrop>
		</>
	);
}
