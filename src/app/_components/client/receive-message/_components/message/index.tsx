"use client";
import React, { useState } from "react";
import {
	Avatar,
	Typography,
	Stack,
	Button,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { SendOutlined, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import io from "socket.io-client";
import { sendMessageInState } from "@/redux/slices/user";

const socket = io("http://localhost:5000");

export function Message({
	senderName,
	senderImage,
	message,
	closeSnackbar,
	userId,
}: {
	senderName: string;
	senderImage: string;
	message: string;
	closeSnackbar: () => void;
	userId: string;
}) {
	const [isReply, setIsReply] = useState(false);
	const [replyMessage, setReplyMessage] = useState("");
	const { userData } = useSelector((state: RootState) => state.User);
	const dispatch = useDispatch();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setReplyMessage(e.target.value);
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
			receiverId: userId,
			message: replyMessage,
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
				receiverId: userId,
				image: userData.image || "",
				message: replyMessage,
				time: new Date().toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				}),
			})
		);

		setReplyMessage("");
		closeSnackbar();
	};

	return (
		<Stack width={300}>
			<Stack>
				<Stack spacing={1} justifyContent={"space-between"} direction={"row"}>
					<Stack direction={"row"} spacing={1}>
						<Avatar src={senderImage} sx={{ height: 20, width: 20 }} />
						<Typography variant="caption" sx={{ opacity: 0.7 }}>
							{senderName}
						</Typography>
					</Stack>
					<Close onClick={closeSnackbar} sx={{ cursor: "pointer" }} />
				</Stack>
				<Typography
					noWrap={false}
					sx={{
						marginLeft: 3.5,
						whiteSpace: "normal",
						overflowWrap: "break-word",
						wordBreak: "break-word",
					}}
					variant="body2"
					letterSpacing={1}
				>
					{message}
				</Typography>
			</Stack>
			{isReply ? (
				<OutlinedInput
					id="outlined-adornment-message"
					type={"text"}
					placeholder="Message"
					sx={{ borderRadius: "30px", color: "white" }}
					size="small"
					value={replyMessage}
					onChange={handleChange}
					onKeyUp={(e) => {
						e.key === "Enter" ? sendMessage() : null;
					}}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label={"message"}
								color="primary"
								edge="end"
								// onClick={() => {
								// 	sendMessage();
								// }}
							>
								<SendOutlined />
							</IconButton>
						</InputAdornment>
					}
				/>
			) : (
				<Stack direction={"row"} py={1}>
					<Button
						color="secondary"
						variant="text"
						autoCapitalize="off"
						onClick={() => {
							setIsReply(true);
						}}
						sx={{ padding: 0, margin: 0, fontSize: 12 }}
					>
						Reply
					</Button>
					<Button
						variant="text"
						autoCapitalize="off"
						color="error"
						onClick={closeSnackbar}
						sx={{ padding: 0, margin: 0, fontSize: 12 }}
					>
						Cancel
					</Button>
				</Stack>
			)}
		</Stack>
	);
}
