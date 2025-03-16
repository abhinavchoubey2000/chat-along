"use client";
import React, { useState } from "react";
import {
	Stack,
	Avatar,
	Typography,
	Backdrop,
	Fab,
	Pagination,
	Menu,
	MenuItem,
	CircularProgress,
} from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { deleteStatusInState } from "@/redux/slices/user";
import { useDeleteStatusMutation } from "@/redux/api-slices";

export function MyStatus({
	statusArray,
	loggedInUserImage,
}: {
	statusArray: Array<StatusInterface>;
	loggedInUserImage: string;
}) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const menuOpen = Boolean(anchorEl);
	const router = useRouter();
	const dispatch = useDispatch();
	const [deleteStatus, { isLoading }] = useDeleteStatusMutation();
	// State for opening and closing status backdrop
	const [open, setOpen] = useState(false);
	// State for the index of pagination
	const [statusIndex, setStatusIndex] = useState(1);

	// Function for handling the pagination button next or previous
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setStatusIndex(value);
	};

	const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleLeftRightButtons = (
		event: React.KeyboardEvent<HTMLDivElement>
	) => {
		if (event.key === "left") {
			console.log("Left");
		} else if (event.key === "right") {
			console.log("Right");
		}
	};
	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	// Function for closing the backdrop status window
	const handleClose = () => {
		setOpen(false);
	};

	// Function for opening the backdrop status window
	const handleOpen = () => {
		setOpen(true);
	};

	const handleDeleteStatus = async (statusId: string) => {
		await deleteStatus(statusId);
		dispatch(deleteStatusInState(statusId));
		// Adjust statusIndex if the deleted status was the last one
		if (statusIndex > statusArray.length - 1) {
			setStatusIndex(Math.max(1, statusArray.length - 1));
		}
	};

	return statusArray.length === 0 ? (
		<Link
			href={"/add-status"}
			style={{ textDecoration: "none", color: "black" }}
		>
			<Stack
				onClick={handleOpenMenu}
				alignItems={"center"}
				sx={{ cursor: "pointer", pr: 2 }}
			>
				<Avatar
					src={loggedInUserImage}
					sx={{
						height: 70,
						width: 70,
					}}
				/>
				<Typography textAlign={"center"} variant="caption">
					Add Status
				</Typography>
			</Stack>
		</Link>
	) : (
		<>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={menuOpen}
				onClose={handleCloseMenu}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<MenuItem
					onClick={() => {
						handleOpen();
						handleCloseMenu();
					}}
				>
					View Status
				</MenuItem>
				<MenuItem
					onClick={() => {
						router.push("/add-status");
						handleCloseMenu();
					}}
				>
					Add Status
				</MenuItem>
			</Menu>
			<Stack
				onClick={handleOpenMenu}
				alignItems={"center"}
				sx={{ cursor: "pointer", pr: 2 }}
			>
				<Avatar
					src={loggedInUserImage}
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
			{statusArray.length > 0 && (
				<Backdrop
					sx={(theme) => ({
						color: "#fff",
						zIndex: theme.zIndex.drawer + 1,
						width: "44%",
						height: "100%",
						left: "26.8%",
						bgcolor: statusArray[statusIndex - 1]?.colorCode || "#000",
						backdropFilter: "blur(2px)",
					})}
					open={open}
				>
					<Stack position={"fixed"} top={0}>
						<Stack>
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
							<Fab
								onClick={() => {
									handleDeleteStatus(statusArray[statusIndex - 1]?._id);
								}}
								sx={{
									position: "fixed",
									top: 5,
									right: 50,
									boxShadow: "none",
									bgcolor: "transparent",
								}}
								size="small"
								color="default"
							>
								<Delete fontSize="small" />
							</Fab>
						</Stack>
						<Stack
							position={"fixed"}
							direction={"row"}
							spacing={1}
							top={5}
							left={30}
							alignItems={"center"}
						>
							<Avatar src={loggedInUserImage} sx={{ height: 35, width: 35 }} />
							<Stack spacing={0}>
								<Typography>You</Typography>
								<Typography variant="caption" sx={{ opacity: 0.7 }}>
									2:33 PM
								</Typography>
							</Stack>
						</Stack>
						<Pagination
							count={statusArray.length}
							page={statusIndex}
							onChange={handleChange}
							size="small"
							onKeyUp={handleLeftRightButtons}
						/>
					</Stack>
					{isLoading ? (
						<CircularProgress />
					) : (
						<Typography variant="h2" textAlign={"center"}>
							{statusArray[statusIndex - 1]?.statusContent || ""}
						</Typography>
					)}
				</Backdrop>
			)}
		</>
	);
}
