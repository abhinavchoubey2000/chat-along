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

export function UserStatus({
	followings,
	darkMode,
}: {
	followings: Array<FollowingInterface>;
	darkMode: boolean;
}) {
	// State for opening and closing status backgrop status window
	const [open, setOpen] = useState(false);
	// State for the index of pagination
	const [statusIndex, setStatusIndex] = useState(1);
	// State for the current user status object, initially all the values will be empty due to type safety
	const [currentStatusObject, setCurrentStatusObject] = useState<
		Array<StatusInterface>
	>([{ _id: "", statusContent: "", colorCode: "", colorName: "" }]);
	//Function for handling the pagination button next or previous
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setStatusIndex(value);
	};
	//Function for closing the backdrop status window
	const handleClose = () => {
		setOpen(false);
	};
	//Fuction for opening the backdrop status window
	const handleOpen = (currentStatusArray: Array<StatusInterface>) => {
		setCurrentStatusObject(currentStatusArray);
		setOpen(true);
	};

	return followings.map((user, index) => {
		return user.status?.length === 0 ? null : (
			<div key={index}>
				<Stack
					onClick={() => {
						handleOpen(user.status || []);
					}}
					alignItems={"center"}
					sx={{ cursor: "pointer" }}
					spacing={[0, 1]}
				>
					<Avatar
						src={user.image.image_url}
						sx={{
							height: [40, 70],
							width: [40, 70],
							border: "2px solid #06d001",
						}}
					/>
					<Typography
						textAlign={"center"}
						color={darkMode ? "white" : "black"}
						variant="caption"
					>
						{user.username}
					</Typography>
				</Stack>
				{/* Backdrop component where the status will be viewed */}
				<Backdrop
					sx={(theme) => ({
						color: "#fff",
						zIndex: theme.zIndex.drawer + 1,
						width: ["100%", "44%"],
						height: "100%",
						left: ["-3.9%", "26.8%"],
						bgcolor: `${currentStatusObject[statusIndex - 1].colorCode}`,
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
						<Stack
							position={"fixed"}
							direction={"row"}
							spacing={1}
							top={5}
							left={30}
							alignItems={"center"}
						>
							<Avatar
								src={user.image.image_url}
								sx={{ height: 35, width: 35 }}
							/>
							<Stack spacing={0}>
								<Typography variant="caption">{user.name}</Typography>
								<Typography variant="caption" sx={{ opacity: 0.7 }}>
									2:33 PM
								</Typography>
							</Stack>
						</Stack>
						<Pagination
							count={currentStatusObject.length}
							page={statusIndex}
							onChange={handleChange}
							size="small"
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
