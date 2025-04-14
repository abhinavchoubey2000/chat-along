"use client";

import React, { useState } from "react";
import {
	useDeleteImageFromCloudinaryMutation,
	useDeletePostMutation,
} from "@/redux/api-slices/post";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Menu,
	MenuItem,
	colors,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deletePostFromState } from "@/redux/slices/post";
import { RootState } from "@/redux/store";
import Link from "next/link";
import toast from "react-hot-toast";

export function PostOption({
	id,
	image_public_id,
	darkMode,
}: {
	id: string;
	darkMode: boolean;
	image_public_id: string;
}) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const editIconHoverStyle = { "&:hover": { color: colors.green["700"] } };
	const deleteIconHoverStyle = { "&:hover": { color: colors.red["700"] } };
	const [isDialogOpened, setIsDialogOpened] = useState(false);
	const [deletePost] = useDeletePostMutation();
	const [deleteImageFromCloudinary, { isLoading }] =
		useDeleteImageFromCloudinaryMutation();
	const dispatch = useDispatch();
	const { userData } = useSelector((state: RootState) => state.User);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const openDialog = () => {
		setIsDialogOpened(true);
	};
	const closeDialog = () => {
		setIsDialogOpened(false);
	};
	const handleDeletePost = async () => {
		const response = await deletePost(id);
		await deleteImageFromCloudinary(image_public_id);
		dispatch(deletePostFromState(id));
		closeDialog();
		toast.success(response.data.message);
		window.location.href = "/";
	};

	return !userData?.posts?.find((post) => post?._id === id) ? null : (
		<>
			<IconButton
				aria-label="settings"
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			>
				<MoreVert />
			</IconButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<Link
					href={`/edit-post/${id}`}
					style={{
						textDecoration: "none",
						color: darkMode ? "white" : "black",
					}}
				>
					<MenuItem
						onClick={() => {
							handleClose();
						}}
						sx={editIconHoverStyle}
					>
						Edit Post
					</MenuItem>
				</Link>
				<MenuItem
					sx={deleteIconHoverStyle}
					onClick={() => {
						handleClose();
						openDialog();
					}}
				>
					Delete Post
				</MenuItem>
			</Menu>
			<Dialog
				open={isDialogOpened}
				onClose={closeDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Delete post"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete this post?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeDialog}>Cancel</Button>
					<Button
						onClick={handleDeletePost}
						disabled={isLoading}
						color="error"
						autoFocus
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
