"use client";
import React, { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
// import io from "socket.io-client";
import {
	IconButton,
	Stack,
	Typography,
	Paper,
	Avatar,
	Box,
	FormControl,
	OutlinedInput,
	InputAdornment,
	Menu,
	MenuItem,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";
import Link from "next/link";
import {
	ArrowBack,
	InfoOutlined,
	SendOutlined,
	Image,
} from "@mui/icons-material";
import { RightMessage } from "./_components/right-message";
import { LeftMessage } from "./_components";
import { RootState } from "@/redux/store";
import {
	sendMessageInState,
	// seenMessageInState,
	clearMessagesInState,
} from "@/redux/slices/user";
import {
	useClearMessagesMutation,
	useSaveMessageMutation,
} from "@/redux/api-slices";

// const socket = io("https://chat-along-external-server.onrender.com/", {
// 	transports: ["websocket", "polling"],
// });

export default function ChatBox() {
	const { allUsersData, userData } = useSelector(
		(state: RootState) => state.User
	);
	const dispatch = useDispatch();
	const params = useParams();
	const router = useRouter();
	const [message, setMessage] = useState("");
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [isDialogOpened, setIsDialogOpened] = useState(false);
	const open = Boolean(anchorEl);
	// const [isTyping, setIsTyping] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [saveMessage] = useSaveMessageMutation();
	const [clearMessages] = useClearMessagesMutation();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};
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
	const deleteIconHoverStyle = { "&:hover": { color: "error" } };
	const macthedUserData = allUsersData.find(
		(user) => user._id === params.userId
	);

	const openFileInput = () => {
		fileInputRef.current?.click();
	};

	const handleClearMessages = () => {
		dispatch(clearMessagesInState(macthedUserData?._id || ""));
		clearMessages(macthedUserData?._id || "");
		closeDialog();
	};

	// socket
	// 	.off()
	// 	.on(
	// 		"receiveTypingSignal",
	// 		(data: { senderId: string; receiverId: string; isTyping: boolean }) => {
	// 			if (data.receiverId === userData?._id) {
	// 				setIsTyping(true);
	// 				setTimeout(() => {
	// 					setIsTyping(false);
	// 				}, 2000);
	// 			}
	// 		}
	// 	);

	const sendTypingSignal = () => {
		// const data: {
		// 	senderId: string;
		// 	receiverId: string;
		// 	isTyping: boolean;
		// } = {
		// 	senderId: userData._id || "",
		// 	receiverId: macthedUserData?._id || "",
		// 	isTyping: true,
		// };
		// socket.off().emit("sendTypingSignal", data);
	};

	const sendMessage = async () => {
		const data: {
			senderId: string;
			receiverId: string;
			message: string;
			image: { image_url: string; public_id: string };
			time: string;
		} = {
			senderId: userData._id || "",
			receiverId: macthedUserData?._id || "",
			message,
			image: userData.image || { image_url: "", public_id: "" },
			time: new Date().toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
			}),
		};
		// socket.off().emit("sendMessage", data);

		dispatch(
			sendMessageInState({
				receiverId: macthedUserData?._id || "",
				image: userData.image || { image_url: "", public_id: "" },
				message,
				time: new Date().toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				}),
			})
		);

		setMessage("");
		await saveMessage({
			receiverId: data.receiverId,
			message: data.message,
			image: data.image,
			time: data.time,
		});
	};
	const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			sendMessage();
		} else {
			sendTypingSignal();
		}
	};
	// useEffect(() => {
	// 	dispatch(seenMessageInState(macthedUserData?._id || ""));
	// }, [userData.chats]);

	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			justifyContent={"space-between"}
			height={"100%"}
			py={1}
		>
			<Paper elevation={0}>
				<Stack
					paddingY={1}
					paddingX={1}
					direction={"row"}
					alignItems={"center"}
					justifyContent={"space-between"}
					gap={2}
					width={"100%"}
				>
					<Stack direction={"row"} spacing={1} alignItems={"center"}>
						<Link href={"/chats"}>
							<IconButton area-label={"Open Notifications"} size="large">
								<ArrowBack sx={{ fontSize: "1.5rem" }} />
							</IconButton>
						</Link>
						<Stack
							sx={{ cursor: "pointer" }}
							direction={"row"}
							gap={2}
							onClick={() => {
								router.push(`/${macthedUserData?.username}`);
							}}
						>
							<Stack direction={"row"} gap={[1, 2]}>
								<Avatar
									sx={{ height: ["2rem", "3rem"], width: ["2rem", "3rem"] }}
									src={macthedUserData?.image?.image_url}
								/>
								<Stack>
									<Typography sx={{ fontSize: ["0.8rem", "1rem"] }}>
										{macthedUserData?.name}
									</Typography>
									<Typography
										sx={{ opacity: 0.7, fontSize: ["0.8rem", "1rem"] }}
									>
										{macthedUserData?.username}
									</Typography>
								</Stack>
								{/* {isTyping ? (
									<Typography sx={{ fontWeight: "bold" }} variant="caption">
										Typing...
									</Typography>
								) : null} */}
							</Stack>
						</Stack>
					</Stack>
					<IconButton
						area-label={"Open Notifications"}
						size="large"
						onClick={handleClick}
					>
						<InfoOutlined sx={{ fontSize: "1.5rem" }} />
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
								openDialog();
							}}
							sx={deleteIconHoverStyle}
						>
							Clear Messages
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
								Are you sure you want to delete these messages?
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={closeDialog}>Cancel</Button>
							<Button onClick={handleClearMessages} color="error" autoFocus>
								Yes
							</Button>
						</DialogActions>
					</Dialog>
				</Stack>
			</Paper>

			<Box
				paddingX={0}
				marginBottom={1}
				height={"100%"}
				width={"100%"}
				sx={{ overflowY: "auto" }}
				display={"flex"}
				flexDirection={"column-reverse"}
				gap={1}
			>
				{userData.chats?.[`${macthedUserData?._id}` || ""]
					?.slice()
					.reverse()
					.map((value, index) => {
						return value.name === "sender" ? (
							<RightMessage
								key={index}
								message={value.message}
								time={value.time}
								image={value.image.image_url}
							/>
						) : (
							<LeftMessage
								key={index}
								message={value.message}
								time={value.time}
								image={value.image.image_url}
							/>
						);
					})}
			</Box>
			<FormControl variant="outlined" fullWidth color="primary">
				<OutlinedInput
					id="outlined-adornment-message"
					type={"text"}
					placeholder="Message"
					sx={{ borderRadius: "30px", fontSize: "0.8rem" }}
					value={message}
					onChange={handleChange}
					onKeyUp={handleKey}
					endAdornment={
						<InputAdornment position="end">
							{message === "" ? (
								<IconButton
									aria-label={"image"}
									edge="end"
									
									onClick={openFileInput}
								>
									<Image />
									<input
										style={{ display: "none" }}
										type="file"
										ref={fileInputRef}
									/>
								</IconButton>
							) : (
								<IconButton
									aria-label={"message"}
									color="primary"
									edge="end"
									onClick={() => {
										sendMessage();
									}}
								>
									<SendOutlined />
								</IconButton>
							)}
						</InputAdornment>
					}
				/>
			</FormControl>
		</Box>
	);
}
