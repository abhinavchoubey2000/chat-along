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

export function UserStatus({ statusArray }: UserStatusPropsInterface) {
	// State for opening and closing status backgrop status window
	const [open, setOpen] = useState(false);
	// State for the index of pagination
	const [statusIndex, setStatusIndex] = useState(1);
	// State for the current user status object, initially all the values will be empty due to type safety
	const [currentStatusObject, setCurrentStatusObject] = useState<
		Array<UserStatusObjectInterface>
	>([{ _id: 0, statusContent: "", bgColor: "" }]);
	//Function for handling the pagination button next or previous
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setStatusIndex(value);
	};
	//Function for closing the backdrop status window
	const handleClose = () => {
		setOpen(false);
	};
	//Fuction for opening the backdrop status window
	const handleOpen = (currentStatusArray: Array<UserStatusObjectInterface>) => {
		console.log(currentStatusArray);
		setCurrentStatusObject(currentStatusArray);
		setOpen(true);
	};

	return statusArray.map((value, index) => {
		return (
			<div key={index}>
				<Stack
					onClick={() => {
						handleOpen(value.status);
					}}
					alignItems={"center"}
					sx={{ cursor: "pointer" }}
				>
					<Avatar
						src={value.image}
						sx={{ height: 70, width: 70, border: "2px solid #06d001" }}
					/>
					<Typography textAlign={"center"} variant="caption">
						{value.username}
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
						bgcolor: `${currentStatusObject[statusIndex - 1].bgColor}`,
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
						>
							<Close fontSize="small" />
						</Fab>
						<Pagination
							count={currentStatusObject.length}
							page={statusIndex}
							color="primary"
							onChange={handleChange}
							size="large"
						/>
					</Stack>
					<Typography variant="h2" textAlign={"center"}>
						{currentStatusObject[statusIndex - 1].statusContent}
					</Typography>
				</Backdrop>
			</div>
		);
	});
}
