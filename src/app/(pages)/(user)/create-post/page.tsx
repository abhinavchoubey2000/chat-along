"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import { useCreatePostMutation } from "@/redux/api-slices/post";
import {
	Box,
	IconButton,
	Stack,
	Typography,
	TextareaAutosize,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	Button,
	CircularProgress,
} from "@mui/material";
import { ArrowBack, Check, CloudUpload } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

export default function CreatePost() {
	const [createPost, { isLoading }] = useCreatePostMutation();
	const [imageUrl, setImageUrl] = useState("");
	const [caption, setCaption] = useState("");
	const imageRef = useRef<HTMLImageElement | null>(null);

	const addImageViaLink = () => {
		if (imageRef.current) {
			imageRef.current.src = imageUrl;
		}
	};
	const createUserPost = async () => {
		const postObj = {
			post_image: imageUrl,
			caption,
		};
		const response = await createPost(postObj);
		setCaption("");
		setImageUrl("");
		window.location.href = "/";
	};
	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			alignItems={"center"}
			gap={5}
		>
			<Stack
				paddingY={1}
				paddingX={1}
				direction={"row"}
				alignItems={"center"}
				gap={2}
				width={"100%"}
			>
				<Link href={"/"}>
					<IconButton area-label={"Open Notifications"} size="large">
						<ArrowBack sx={{ fontSize: "1.5rem" }} />
					</IconButton>
				</Link>
				<Typography>Create new post</Typography>
			</Stack>

			<Stack
				width={"100%"}
				height={"25vh"}
				gap={2}
				direction={"row"}
				justifyContent={"space-between"}
			>
				<Box
					width={"50%"}
					height={"25vh"}
					display={"flex"}
					justifyContent={"center"}
				>
					<img
						style={{ borderRadius: 5 }}
						ref={imageRef}
						src={
							"https://icons.veryicon.com/png/o/healthcate-medical/medical-profession-1/ico-nurse-workstation-photo-file-management-1.png"
						}
						alt="Post image"
						width={"100%"}
						height={"100%"}
					/>
				</Box>
				<TextareaAutosize
					maxRows={"100%"}
					value={caption}
					onChange={(e) => {
						setCaption(e.target.value);
					}}
					style={{
						width: "100%",
						fontSize: "1rem",
						outline: "none",
						border: "1px solid #d5d5d5",
						padding: "8px",
						resize: "none",
						borderRadius: 5,
					}}
					placeholder="Write a caption..."
				/>
			</Stack>

			<FormControl variant="outlined" fullWidth color="primary">
				<InputLabel htmlFor="outlined-adornment-add-comment">
					Image url
				</InputLabel>
				<OutlinedInput
					id="outlined-adornment-image-url"
					type={"text"}
					value={imageUrl}
					onChange={(e) => {
						setImageUrl(e.target.value);
					}}
					endAdornment={
						<InputAdornment position="end">
							{imageUrl !== "" ? (
								<IconButton
									color="secondary"
									aria-label={"search"}
									edge="end"
									onClick={addImageViaLink}
								>
									<Check />
								</IconButton>
							) : null}
						</InputAdornment>
					}
					label="Image URL"
				/>
			</FormControl>
			<Typography>Or</Typography>
			<Button
				component="label"
				role={undefined}
				variant="contained"
				tabIndex={-1}
				startIcon={<CloudUpload />}
				fullWidth
			>
				Upload image from files
				<VisuallyHiddenInput
					type="file"
					onChange={(event) => console.log(event.target.files)}
				/>
			</Button>

			<Button
				sx={{ justifySelf: "flex-end" }}
				color="secondary"
				fullWidth
				onClick={createUserPost}
				variant="outlined"
			>
				{isLoading ? (
					<Typography
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						gap={1}
					>
						Please wait <CircularProgress size={18} color="secondary" />
					</Typography>
				) : (
					<Typography>Post</Typography>
				)}
			</Button>
		</Box>
	);
}
