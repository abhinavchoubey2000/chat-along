"use client";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
	receiveMessageInState,
	receiveNotificationInState,
} from "@/redux/slices/user";
import { Message } from "./_components";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";
import { Alert, Snackbar, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";
import { useState } from "react";

const socket = io("http://localhost:5000");

export function ReceiveMessage() {
	// Hooks
	const dispatch = useDispatch();
	const { userData, allUsersData } = useSelector(
		(state: RootState) => state.User
	);
	const [open, setOpen] = useState(false);
	const [senderData, setSenderData] = useState({
		name: "",
		image: "",
		message: "",
		id: "",
	});
	const pathname = usePathname();

	socket
		.off()
		.on(
			"receiveNotification",
			(data: {
				senderId: string;
				senderImage: string;
				senderName: string;
				receiverId: string;
				action: string;
			}) => {
				console.log("Recived Notification")
				if (data.receiverId === userData._id) {
					
					dispatch(
						receiveNotificationInState({
							senderName: data.senderName,
							senderImage: data.senderImage,
							action: data.action,
						})
					);
				}
			}
		);

	socket
		.off()
		.on(
			"receiveMessage",
			(data: {
				senderId: string;
				receiverId: string;
				message: string;
				image: string;
				time: string;
			}) => {
				if (data.receiverId === userData._id) {
					if (!pathname.startsWith("/chats/")) {
						const senderName = allUsersData.find(
							(user) => user._id === data.senderId
						)?.name;
						setSenderData({
							name: senderName || "",
							image: data.image,
							message: data.message,
							id: data.senderId,
						});
						setOpen(true);
					}
					dispatch(
						receiveMessageInState({
							senderId: data.senderId,
							image: data.image,
							time: data.time,
							message: data.message,
						})
					);
				}
			}
		);

	const closeSnackbar = () => {
		setOpen(false);
	};
	return (
		<>
			<Snackbar
				sx={{ width: "80%" }}
				open={open}
				// onClose={closeSnackbar}
				autoHideDuration={10000}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				message={
					<Message
						senderName={senderData.name}
						senderImage={senderData.image}
						message={senderData.message}
						closeSnackbar={closeSnackbar}
						userId={senderData.id}
					/>
				}
			/>
		</>
	);
}
