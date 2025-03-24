"use client";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { receiveMessageInState } from "@/redux/slices/user";
import { Message } from "./_components";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";
import { Snackbar } from "@mui/material";
import { useState } from "react";

const socket = io("https://chat-along-external-server.onrender.com/");

export function ReceiveMessage() {
	// Hooks
	const dispatch = useDispatch();
	const { userData, allUsersData } = useSelector(
		(state: RootState) => state.User
	);
	const [open, setOpen] = useState(false);
	const [senderData, setSenderData] = useState({
		name: "",
		image: { image_url: "", public_id: "" },
		message: "",
		id: "",
	});
	const pathname = usePathname();

	socket
		.off()
		.on(
			"receiveMessage",
			(data: {
				senderId: string;
				receiverId: string;
				message: string;
				imageMessage: string;
				image: { image_url: string; public_id: string };
				time: string;
				name: string;
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
							name: data.name,
							imageMessage: data.imageMessage,
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
