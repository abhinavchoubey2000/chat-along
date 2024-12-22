"use client";

import React from "react";
import { IconButton, Menu, MenuItem, colors } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

export function PostOption() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const editIconHoverStyle = { "&:hover": { color:  colors.green["700"]} };
	const deleteIconHoverStyle = { "&:hover": { color: colors.red["700"] } };

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
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
						console.log("Edit Post clicked");
						handleClose();
					}}
					sx={editIconHoverStyle}
				>
					Edit Post
				</MenuItem>
				<MenuItem
					sx={deleteIconHoverStyle}
					onClick={() => {
						console.log("Delete Post clicked");
						handleClose();
					}}
				>
					Delete Post
				</MenuItem>
			</Menu>
		</>
	);
}
