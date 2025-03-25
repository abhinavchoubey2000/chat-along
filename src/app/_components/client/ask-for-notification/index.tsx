"use client";
import { useEffect } from "react";

export function AskForNotification() {
	useEffect(() => {
		if ("Notification" in window) {
			if (Notification.permission === "default") {
				Notification.requestPermission().then((permission) => {
					if (permission === "granted") {
						console.log("Notification permission granted.");
					} else {
						console.log("Notification permission denied.");
					}
				});
			}
		} else {
			console.log("Notifications are not supported in this browser.");
		}
	}, []);

	return null;
}
