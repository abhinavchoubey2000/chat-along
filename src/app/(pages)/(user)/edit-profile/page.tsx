"use client";
import {
	Avatar,
	Box,
	Button,
	Divider,
	IconButton,
	TextField,
	Stack,
	Typography,
	CircularProgress,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { ArrowBack, Edit } from "@mui/icons-material";
import { useReplaceImageInCloudinaryMutation } from "@/redux/api-slices";
import { useEditProfileMutation } from "@/redux/api-slices";

export default function EditProfile() {
	const { userData } = useSelector((state: RootState) => state.User);
	const [editProfile] = useEditProfileMutation();
	const [replaceImageInCloudinary, { isLoading }] =
		useReplaceImageInCloudinaryMutation();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [nameText, setNameText] = useState(false);
	const [emailText, setEmailText] = useState(false);
	const [phoneText, setPhoneText] = useState(false);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imageSrc, setImageSrc] = useState<string>("");
	const [editData, setEditData] = useState<{
		image: { image_url: string; public_id: string };
		name: string;
		email: string;
		phone: string;
	}>({
		image: userData.image || { image_url: "", public_id: "" },
		name: userData?.name || "",
		email: userData?.email || "",
		phone: userData?.phone || "",
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setEditData((prev) => {
			return { ...prev, [name]: value };
		});
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const currentFile = event.target.files?.[0];

		if (currentFile) {
			setImageFile(currentFile);
			setImageSrc(URL.createObjectURL(currentFile));
		}
	};

	const updateChanges = async () => {
		if (imageFile) {
			const formData = new FormData();
			formData.append("image", imageFile as Blob);
			formData.append("publicId", userData.image?.public_id || "");
			const response = await replaceImageInCloudinary(formData);
			const imageData = {
				image_url: response.data.image_url,
				public_id: response.data.public_id,
			};
			await editProfile({
				image: imageData,
				name: editData.name,
				email: editData.email,
				phone: editData.phone,
			});
		} else {
			await editProfile({
				image: userData.image || { image_url: "", public_id: "" },
				name: editData.name,
				email: editData.email,
				phone: editData.phone,
			});
		}

		window.location.href = "/profile";
	};

	useEffect(() => {
		setImageSrc(userData.image?.image_url || "");
	}, []);

	return (
		<Box
			display={"flex"}
			px={[2, 0]}
			flexDirection={"column"}
			width={"100%"}
			gap={3}
		>
			<Stack
				paddingY={1}
				paddingX={1}
				direction={"row"}
				alignItems={"center"}
				gap={2}
				width={"100%"}
			>
				<Link href={"/profile"}>
					<IconButton area-label={"Open Notifications"} size="large">
						<ArrowBack sx={{ fontSize: "1.5rem" }} />
					</IconButton>
				</Link>
				<Typography>Edit profile</Typography>
			</Stack>
			<Stack
				direction={"row"}
				spacing={1}
				alignItems={"center"}
				bgcolor={userData.settings?.darkMode ? "#212121" : "#efefef"}
				justifyContent={"center"}
				py={2}
				px={2}
				borderRadius={2}
			>
				<Avatar src={imageSrc} sx={{ width: [100, 150], height: [100, 150] }} />
				<IconButton
					sx={{ width: [20, 50], height: [20, 50] }}
					color="primary"
					onClick={() => {
						fileInputRef.current?.click();
					}}
				>
					<Edit sx={{ fontSize: [25, 40] }} />
				</IconButton>
				<input
					style={{ display: "none" }}
					type="file"
					accept="image/*"
					ref={fileInputRef}
					onChange={handleFileChange}
				/>
			</Stack>
			<Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
				{nameText ? (
					<TextField
						variant="outlined"
						fullWidth
						label="Name"
						value={editData.name}
						onChange={handleChange}
						name="name"
						size="small"
					/>
				) : (
					<Stack
						direction={"row"}
						spacing={1}
						alignItems={"center"}
						bgcolor={userData.settings?.darkMode ? "#212121" : "#efefef"}
						px={1}
						borderRadius={2}
					>
						<Typography sx={{ fontSize: ["0.8rem", "2rem"] }}>
							{userData.name}
						</Typography>
						<IconButton
							sx={{ width: [20, 50], height: [20, 50] }}
							color="primary"
							onClick={() => {
								setNameText(true);
							}}
						>
							<Edit sx={{ fontSize: 18 }} />
						</IconButton>
					</Stack>
				)}
				<Stack
					direction={"row"}
					spacing={1}
					alignItems={"center"}
					bgcolor={"#919191"}
					py={1}
					px={2}
					borderRadius={2}
				>
					<Typography
						color={userData.settings?.darkMode ? "black" : "white"}
						sx={{ opacity: 0.7, fontSize: ["0.8rem", "1.5rem"] }}
					>
						#{userData.username}
					</Typography>
				</Stack>
			</Stack>
			<Stack>
				<Typography fontWeight={"bold"} sx={{ fontSize: ["0.8rem", "1rem"] }}>
					Email and Phone:
				</Typography>
				<Divider />
				<Stack
					spacing={2}
					py={2}
					gap={1}
					direction={["column", "row"]}
					justifyContent={"space-between"}
				>
					{emailText ? (
						<TextField
							variant="outlined"
							fullWidth
							label="Email"
							value={editData.email}
							onChange={handleChange}
							name="email"
							size="small"
						/>
					) : (
						<Stack
							direction={"row"}
							spacing={1}
							alignItems={"center"}
							bgcolor={userData.settings?.darkMode ? "#212121" : "#efefef"}
							px={2}
							py={1}
							borderRadius={2}
						>
							<Typography sx={{ fontSize: ["0.8rem", "1rem"] }}>
								{userData.email}
							</Typography>
							<IconButton
								sx={{ width: 25, height: 25 }}
								color="primary"
								onClick={() => {
									setEmailText(true);
								}}
							>
								<Edit sx={{ fontSize: 18 }} />
							</IconButton>
						</Stack>
					)}
					{phoneText ? (
						<TextField
							variant="outlined"
							fullWidth
							label="Phone Number"
							value={editData.phone}
							onChange={handleChange}
							name="phone"
							size="small"
						/>
					) : (
						<Stack
							direction={"row"}
							spacing={1}
							alignItems={"center"}
							bgcolor={userData.settings?.darkMode ? "#212121" : "#efefef"}
							px={2}
							py={1}
							borderRadius={2}
						>
							<Typography sx={{ fontSize: ["0.8rem", "1rem"] }}>
								{userData.phone}
							</Typography>
							<IconButton
								sx={{ width: 25, height: 25 }}
								color="primary"
								onClick={() => {
									setPhoneText(true);
								}}
							>
								<Edit sx={{ fontSize: 18 }} />
							</IconButton>
						</Stack>
					)}
				</Stack>
			</Stack>
			<Button color="secondary" variant="contained" onClick={updateChanges}>
				{isLoading ? (
					<CircularProgress sx={{ color: "white" }} size={18} />
				) : (
					"Update Changes"
				)}
			</Button>
		</Box>
	);
}
