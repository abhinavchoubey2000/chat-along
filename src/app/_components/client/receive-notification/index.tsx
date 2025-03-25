"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { receiveNotificationInState } from "@/redux/slices/user";
import { RootState } from "@/redux/store";

const socket = io("https://chat-along-external-server.onrender.com/");

export function ReceiveNotification() {
	const dispatch = useDispatch();
	const { userData } = useSelector((state: RootState) => state.User);

	useEffect(() => {
		// Ensure service worker is registered for push notifications
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker.register("/service-worker.js").then(() => {
				console.log("Service Worker Registered!");
			});
		}

		socket.on(
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
					if (Notification.permission === "granted") {
						// 1 Use Service Worker for better reliability
						navigator.serviceWorker.ready.then((registration) => {
							if (data.action === "follow") {
								return registration.showNotification(
									`${data.senderName} just followed you.`,
									{
										body: "chatAlong",
										icon: data.senderImage.image_url || "/logo.png",
										badge: "/logo.png",
										data: { url: data.link },
									}
								);
							} else if (data.action === "like") {
								return registration.showNotification(
									`${data.senderName} liked your post.`,
									{
										body: "chatAlong",
										icon: data.senderImage.image_url || "/logo.png",
										badge: "/logo.png",
										data: { url: data.link },
									}
								);
							} else {
								return registration.showNotification(
									`${data.senderName} commented on your post.`,
									{
										body: "chatAlong",
										icon: data.senderImage.image_url || "/logo.png",
										badge: "/logo.png",
										data: { url: data.link },
									}
								);
							}
						});
					} else {
						// 2 Ask for permission if not granted
						Notification.requestPermission().then((permission) => {
							if (permission === "granted") {
								navigator.serviceWorker.ready.then((registration) => {
									if (data.action === "follow") {
										return registration.showNotification(
											`${data.senderName} just followed you.`,
											{
												body: "chatAlong",
												icon: data.senderImage.image_url || "/logo.png",
												badge: "/logo.png",
												data: { url: data.link },
											}
										);
									} else if (data.action === "like") {
										return registration.showNotification(
											`${data.senderName} liked your post.`,
											{
												body: "chatAlong",
												icon: data.senderImage.image_url || "/logo.png",
												badge: "/logo.png",
												data: { url: data.link },
											}
										);
									} else {
										return registration.showNotification(
											`${data.senderName} commented on your post.`,
											{
												body: "chatAlong",
												icon: data.senderImage.image_url || "/logo.png",
												badge: "/logo.png",
												data: { url: data.link },
											}
										);
									}
								});
							}
						});
					}

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

		return () => {
			socket.off("receiveNotification");
		};
	}, [dispatch, userData]);

	return null;
}
