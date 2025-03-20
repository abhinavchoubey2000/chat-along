"use client";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { receiveNotificationInState } from "@/redux/slices/user";
import { RootState } from "@/redux/store";

const socket = io("https://chat-along-external-server.onrender.com/");

export function ReceiveNotification() {
	// Hooks
	const dispatch = useDispatch();
	const { userData } = useSelector((state: RootState) => state.User);

	socket
		.off()
		.on(
			"receiveNotification",
			(data: {
				senderId: string;
				senderImage: { image_url: string; public_id: string };
				senderName: string;
				receiverId: string;
				action: string;
				link: string;
			}) => {
				if (
					data.receiverId === userData._id &&
					data.senderId !== data.receiverId
				) {
					dispatch(
						receiveNotificationInState({
							name: data.senderName,
							image: data.senderImage,
							action: data.action,
							link: data.link,
						})
					);
				}
			}
		);

	return <></>;
}
