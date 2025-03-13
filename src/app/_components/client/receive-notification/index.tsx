"use client";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { receiveNotificationInState } from "@/redux/slices/user";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";

const socket = io("http://localhost:5000");

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
				senderImage: string;
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
							senderName: data.senderName,
							senderImage: data.senderImage,
							action: data.action,
							link: data.link,
						})
					);
				}
			}
		);

	return <></>;
}
