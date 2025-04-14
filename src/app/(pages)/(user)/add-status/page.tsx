"use client";

import { ArrowBack, AddBox, Palette } from "@mui/icons-material";
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import { addStatusInState } from "@/redux/slices/user";
import { useAddStatusMutation } from "@/redux/api-slices";

export default function AddStatus() {
	const colorObj = [
		{ colorName: "Red", colorCode: "#ff0000" },
		{ colorName: "Yellow", colorCode: "#ffbf00" },
		{ colorName: "Royal Blue", colorCode: "#1301ff" },
		{ colorName: "Sky Blue", colorCode: "#9aa6e5" },
		{ colorName: "Pink", colorCode: "#ff6fb7" },
		{ colorName: "Green", colorCode: "#7dff6f" },
		{ colorName: "Orange", colorCode: "#ff8f00" },
		{ colorName: "Gray", colorCode: "#695f54" },
		{ colorName: "Purple", colorCode: "#ce01ff" },
		{ colorName: "Lime", colorCode: "#a6ff00" },
	];
	const [text, setText] = useState("");
	const dispatch = useDispatch();
	const [addStatus, { isLoading }] = useAddStatusMutation();
	const router = useRouter();
	const [currentColor, setCurrentColor] = useState(colorObj[0]);
	const handleColorChange = (colorData: {
		colorName: string;
		colorCode: string;
	}) => {
		setCurrentColor({
			colorCode: colorData.colorCode,
			colorName: colorData.colorName,
		});
		handleClose();
	};

	const [open, setOpen] = React.useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleAddStatus = async () => {
		const statusData = {
			statusContent: text,
			colorCode: currentColor.colorCode,
			colorName: currentColor.colorName,
		};
		await addStatus(statusData);
		dispatch(addStatusInState(statusData));
		router.push("/");
	};
	const handleOpen = () => {
		setOpen(true);
	};
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (text.length < 215) {
			setText(event.target.value);
			// Auto-resize logic
			if (textareaRef.current) {
				textareaRef.current.style.height = "auto"; // Reset height
				textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
			}
		}
	};

	useEffect(()=>{
		const getRandomColor = () => {
			const randomIndex = Math.floor(Math.random() * colorObj.length);
			setCurrentColor(colorObj[randomIndex]);
		};

		getRandomColor();
	},[])

	return (
		<Stack spacing={2}>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					<Typography>Choose color</Typography>
					<Stack gap={1} direction={"row"} flexWrap={"wrap"} my={2}>
						{colorObj.map((color, index) => {
							return (
								<Box
									key={index}
									bgcolor={"#e9e5e5"}
									onClick={() => {
										handleColorChange({
											colorCode: color.colorCode,
											colorName: color.colorName,
										});
									}}
									sx={{
										"&:hover": {
											bgcolor: "#bfbcbc",
											transition: "all 0.3s",
											cursor: "pointer",
										},
									}}
									display={"flex"}
									justifyContent={"center"}
									alignItems={"center"}
									flexDirection={"column"}
									py={2}
									borderRadius={4}
									width={[70, 100]}
									height={[70, 100]}
									gap={1}
								>
									<Stack
										width={[10, 15]}
										display={"inline-flex"}
										height={[10, 15]}
										borderRadius={"50%"}
										bgcolor={color.colorCode}
									></Stack>
									<Typography variant="caption">{color.colorName}</Typography>
								</Box>
							);
						})}
					</Stack>
				</DialogContent>
			</Dialog>

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
				<Typography>Add Status</Typography>
			</Stack>
			<Box
				width={"100%"}
				height={"70vh"}
				display={"flex"}
				alignItems={"center"}
				justifyContent={"center"}
				bgcolor={currentColor.colorCode}
			>
				<textarea
					ref={textareaRef}
					value={text}
					onChange={handleChange}
					placeholder="Write Your Thoughts..."
					rows={1}
					autoFocus
					style={{
						background: "transparent",
						width: "100%",
						height: "20%",
						textAlign: "center",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "2rem",
						border: "none",
						outline: "none",
						resize: "none",
					}}
				/>
			</Box>
			<Stack direction={"row"} spacing={2}>
				<IconButton onClick={handleOpen}>
					<Palette sx={{ color: currentColor.colorCode }} />
				</IconButton>
				<Button
					endIcon={<AddBox />}
					variant="contained"
					fullWidth
					onClick={handleAddStatus}
					disabled={isLoading}
				>
					{isLoading ? (
						<CircularProgress sx={{ color: "white" }} size={18} />
					) : (
						"Add Status"
					)}
				</Button>
			</Stack>
		</Stack>
	);
}
