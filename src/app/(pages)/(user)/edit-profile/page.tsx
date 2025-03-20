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
	// CircularProgress,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { ArrowBack, Edit } from "@mui/icons-material";
// import { useEditProfileMutation } from "@/redux/api-slices";

export default function EditProfile() {
	const { userData } = useSelector((state: RootState) => state.User);
	// const [editProfile, { isLoading }] = useEditProfileMutation();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [editStates, setEditStates] = useState({
		image: false,
		name: false,
		email: false,
		phone: false,
	});
	const [editData, setEditData] = useState<{
		image: { image_url: string; public_id: string };
		name: string;
		email: string;
		phone: string;
	}>({
		image: userData?.image || { image_url: "", public_id: "" },
		name: userData?.name || "",
		email: userData?.email || "",
		phone: userData?.phone || "",
	});

	const handleEditState = (name: string) => {
		setEditStates((prev) => {
			return {
				...prev,
				[name]: true,
			};
		});
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setEditData((prev) => {
			return { ...prev, [name]: value };
		});
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event)
		// const currentFile = event.target.files?.[0];
		// if (currentFile) {
		// 	setEditData((prev) => {
		// 		return { ...prev, image: currentFile };
		// 	});
		// }
	};

	const updateChanges = async () => {
		// await editProfile({
		// 	image: editData.image,
		// 	name: editData.name,
		// 	email: editData.email,
		// 	phone: editData.phone,
		// });
		window.location.href = "/profile";
	};

	return (
		<Box display={"flex"} flexDirection={"column"} width={"100%"} gap={3}>
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
				bgcolor={"#efefef"}
				justifyContent={"center"}
				py={2}
				px={2}
				borderRadius={2}
			>
				<Avatar
					src={editData.image.image_url}
					sx={{ width: 150, height: 150 }}
				/>
				<IconButton
					sx={{ width: 50, height: 50 }}
					color="primary"
					onClick={() => {
						fileInputRef.current?.click();
					}}
				>
					<Edit sx={{ fontSize: 40 }} />
				</IconButton>
				<input
					style={{ display: "none" }}
					type="file"
					ref={fileInputRef}
					onChange={handleFileChange}
				/>
			</Stack>
			<Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
				{editStates.name ? (
					<TextField
						variant="outlined"
						fullWidth
						label="Name"
						value={editData.name}
						onChange={handleChange}
						name="name"
					/>
				) : (
					<Stack
						direction={"row"}
						spacing={1}
						alignItems={"center"}
						bgcolor={"#efefef"}
						px={1}
						borderRadius={2}
					>
						<Typography variant="h6">{userData.name}</Typography>
						<IconButton
							sx={{ width: 50, height: 50 }}
							color="primary"
							onClick={() => {
								handleEditState("name");
							}}
						>
							<Edit />
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
					<Typography sx={{ opacity: 0.7 }} variant="h6">
						#{userData.username}
					</Typography>
				</Stack>
			</Stack>
			<Stack>
				<Typography fontWeight={"bold"}>Email and Phone:</Typography>
				<Divider />
				<Stack
					spacing={2}
					py={2}
					direction={"row"}
					justifyContent={"space-between"}
				>
					{editStates.email ? (
						<TextField
							variant="outlined"
							fullWidth
							label="Email"
							value={editData.email}
							onChange={handleChange}
							name="email"
						/>
					) : (
						<Stack
							direction={"row"}
							spacing={1}
							alignItems={"center"}
							bgcolor={"#efefef"}
							px={2}
							py={1}
							borderRadius={2}
						>
							<Typography variant="subtitle2">{userData.email}</Typography>
							<IconButton
								sx={{ width: 25, height: 25 }}
								color="primary"
								onClick={() => {
									handleEditState("email");
								}}
							>
								<Edit sx={{ fontSize: 18 }} />
							</IconButton>
						</Stack>
					)}
					{editStates.phone ? (
						<TextField
							variant="outlined"
							fullWidth
							label="Phone Number"
							value={editData.phone}
							onChange={handleChange}
							name="phone"
						/>
					) : (
						<Stack
							direction={"row"}
							spacing={1}
							alignItems={"center"}
							bgcolor={"#efefef"}
							px={2}
							py={1}
							borderRadius={2}
						>
							<Typography variant="subtitle2">{userData.phone}</Typography>
							<IconButton
								sx={{ width: 25, height: 25 }}
								color="primary"
								onClick={() => {
									handleEditState("phone");
								}}
							>
								<Edit sx={{ fontSize: 18 }} />
							</IconButton>
						</Stack>
					)}
				</Stack>
			</Stack>
			<Button color="secondary" variant="contained" onClick={updateChanges}>
				{/* {isLoading ? (
					<CircularProgress sx={{ color: "white" }} size={18} />
				) : ( */}
				Update Changes
				{/*)}*/}
			</Button>
		</Box>
	);
}
