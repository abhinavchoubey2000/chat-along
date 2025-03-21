"use client";

import React, { useState } from "react";
import { deletePostFromState } from "@/redux/slices/post";
import {
	useDeleteImageFromCloudinaryMutation,
	useDeletePostMutation,
} from "@/redux/api-slices/post";
import { useDispatch, useSelector } from "react-redux";
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
import { RootState } from "@/redux/store";

export function PostOption({
	id,
	image_public_id,
}: {
	id: string;
	image_public_id: string;
}) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const editIconHoverStyle = { "&:hover": { color: colors.green["700"] } };
	const deleteIconHoverStyle = { "&:hover": { color: colors.red["700"] } };
	const [isDialogOpened, setIsDialogOpened] = useState(false);
	const dispatch = useDispatch();
	const { userData, isAuthenticated } = useSelector(
		(state: RootState) => state.User
	);
	const [deletePost] = useDeletePostMutation();
	const [deleteImageFromCloudinary] = useDeleteImageFromCloudinaryMutation();
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
		await deleteImageFromCloudinary(image_public_id);
		dispatch(deletePostFromState(id));
		await deletePost(id);
		closeDialog();
	};
	return !isAuthenticated ? null : userData?.posts?.find(
			(post) => post?._id === id
	  ) ? (
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
				<MenuItem
					onClick={() => {
						handleClose();
					}}
					sx={editIconHoverStyle}
				>
					Edit Post
				</MenuItem>
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
					<Button onClick={handleDeletePost} color="error" autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	) : null;
}
