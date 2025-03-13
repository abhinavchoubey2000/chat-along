"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
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
} from "@mui/material";
import Link from "next/link";
import { ArrowBack, InfoOutlined, SendOutlined } from "@mui/icons-material";
import { RightMessage } from "./_components/right-message";
import { LeftMessage } from "./_components";
import { RootState } from "@/redux/store";
import { sendMessageInState, seenMessageInState } from "@/redux/slices/user";

const socket = io("http://localhost:5000");

export default function ChatBox() {
	const { allUsersData, userData, chats } = useSelector(
		(state: RootState) => state.User
	);
	const dispatch = useDispatch();
	const params = useParams();
	const router = useRouter();
	const [message, setMessage] = useState("");
	const [isTyping, setIsTyping] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};
	let seen = false;
	const macthedUserData = allUsersData.find(
		(user) => user._id === params.userId
	);

	socket
		.off()
		.on(
			"receiveTypingSignal",
			(data: { senderId: string; receiverId: string; isTyping: boolean }) => {
				if (data.receiverId === userData?._id) {
					setIsTyping(true);
					setTimeout(() => {
						setIsTyping(false);
					}, 2000);
				}
			}
		);

	const sendTypingSignal = () => {
		const data: {
			senderId: string;
			receiverId: string;
			isTyping: boolean;
		} = {
			senderId: userData._id || "",
			receiverId: macthedUserData?._id || "",
			isTyping: true,
		};
		socket.off().emit("sendTypingSignal", data);
	};

	const sendMessage = () => {
		const data: {
			senderId: string;
			receiverId: string;
			message: string;
			image: string;
			time: string;
		} = {
			senderId: userData._id || "",
			receiverId: macthedUserData?._id || "",
			message,
			image: userData.image || "",
			time: new Date().toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
			}),
		};
		socket.off().emit("sendMessage", data);

		dispatch(
			sendMessageInState({
				receiverId: macthedUserData?._id || "",
				image: userData.image || "",
				message,
				time: new Date().toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				}),
			})
		);

		setMessage("");
	};

	useEffect(() => {
		dispatch(seenMessageInState(macthedUserData?._id || ""));
	}, [chats]);
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
					<Stack direction={"row"} spacing={1}>
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
							<Stack direction={"row"} gap={2}>
								<Avatar src={macthedUserData?.image} />
								<Stack>
									<Typography variant="body2">
										{macthedUserData?.name}
									</Typography>
									<Typography variant="caption" sx={{ opacity: 0.7 }}>
										{macthedUserData?.username}
									</Typography>
								</Stack>
								{isTyping ? (
									<Typography sx={{ opacity: 0.7 }} variant="caption">
										Typing...
									</Typography>
								) : null}
							</Stack>
						</Stack>
					</Stack>
					<IconButton area-label={"Open Notifications"} size="large">
						<InfoOutlined sx={{ fontSize: "1.5rem" }} />
					</IconButton>
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
				{chats[`${macthedUserData?._id}` || ""]
					?.slice()
					.reverse()
					.map((value, index) => {
						return value.name === "sender" ? (
							<RightMessage
								key={index}
								message={value.message}
								time={value.time}
								image={value.image}
							/>
						) : (
							<LeftMessage
								key={index}
								message={value.message}
								time={value.time}
								image={value.image}
							/>
						);
					})}
			</Box>
			<FormControl variant="outlined" fullWidth color="primary">
				<OutlinedInput
					id="outlined-adornment-message"
					type={"text"}
					placeholder="Message"
					sx={{ borderRadius: "30px" }}
					value={message}
					onChange={handleChange}
					onKeyUp={(e) => {
						e.key === "Enter" ? sendMessage() : sendTypingSignal();
					}}
					endAdornment={
						<InputAdornment position="end">
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
						</InputAdornment>
					}
				/>
			</FormControl>
		</Box>
	);
}
