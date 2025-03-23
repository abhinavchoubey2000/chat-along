"use client";

import React, { useState } from "react";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import {
	useCreatePostMutation,
	useUploadImageToCloudinaryMutation,
} from "@/redux/api-slices/post";
import {
	Box,
	IconButton,
	Stack,
	Typography,
	TextareaAutosize,
	Button,
	CircularProgress,
} from "@mui/material";
import { ArrowBack, CloudUpload } from "@mui/icons-material";

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
	const [createPost] = useCreatePostMutation();
	const [
		uploadImageToCloudinary,
		{ isLoading: uploadImageToCloudinaryLoading },
	] = useUploadImageToCloudinaryMutation();
	const [caption, setCaption] = useState("");
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imageSrc, setImageSrc] = useState<string>(
		"https://icons.veryicon.com/png/o/healthcate-medical/medical-profession-1/ico-nurse-workstation-photo-file-management-1.png"
	);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const firstFile = event.target.files?.[0];
		if (firstFile) {
			setImageFile(firstFile);
			const imageTempURL = URL.createObjectURL(firstFile);
			setImageSrc(imageTempURL);
		}
	};

	const createUserPost = async () => {
		const formData = new FormData();
		formData.append("image", imageFile as Blob);
		const response: {
			data?: {
				message: string;
				image_url: string;
				public_id: string;
				success: boolean;
			};
		} = await uploadImageToCloudinary(formData);
		await createPost({
			caption,
			date: new Date().toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
				month: "short",
				year: "2-digit",
				day: "2-digit",
			}),
			post_image: {
				image_url: response.data?.image_url || "",
				public_id: response.data?.public_id || "",
			},
		});
		setCaption("");
		window.location.href = "/";
	};

	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			alignItems={"center"}
			gap={[3, 5]}
			px={[1, 0]}
		>
			<Stack
				paddingY={[0, 1]}
				paddingX={1}
				direction={"row"}
				position={"fixed"}
				bgcolor={"white"}
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
				pt={[4,10]}
				width={"100%"}
				height={["100%", "100%"]}
				gap={[1, 2]}
				direction={["column", "row"]}
				alignItems={"center"}
				justifyContent={"space-between"}
			>
				<Box
					width={["70vw", "50%"]}
					height={["40vh", "30vh"]}
					display={"flex"}
					justifyContent={"center"}
				>
					<img
						style={{
							borderRadius: 5,
							maxWidth: "100%",
							maxHeight: "100%",
							height: "auto",
							width: "auto",
						}}
						src={imageSrc}
						alt="Post image"
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
						height: "30vh",
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
					onChange={handleFileChange}
					accept="image/*"
				/>
			</Button>

			<Button
				sx={{ justifySelf: "flex-end" }}
				color="secondary"
				fullWidth
				onClick={createUserPost}
				variant="outlined"
			>
				{uploadImageToCloudinaryLoading ? (
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
