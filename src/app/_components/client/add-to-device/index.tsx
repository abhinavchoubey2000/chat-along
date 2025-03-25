"use client";
import { useEffect, useState } from "react";

export function AddToDevice() {
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);
	const [showInstallPrompt, setShowInstallPrompt] = useState<boolean>(false);

	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register("/service-worker.js")
				.then(() => console.log("Service Worker registered!"))
				.catch((error) =>
					console.error("Service Worker registration failed:", error)
				);
		}

		const handleBeforeInstallPrompt = (event: Event) => {
			event.preventDefault();
			setDeferredPrompt(event as BeforeInstallPromptEvent);
			setShowInstallPrompt(true);
		};

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt
			);
		};
	}, []);

	const installApp = () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === "accepted") {
					console.log("User installed the app");
				} else {
					console.log("User dismissed the installation");
				}
				setDeferredPrompt(null);
				setShowInstallPrompt(false);
			});
		}
	};

	return (
		showInstallPrompt && (
			<button
				style={{
					position: "fixed",
					bottom: "20px",
					right: "20px",
					backgroundColor: "#2196F3",
					color: "white",
					border: "none",
					padding: "10px 20px",
					borderRadius: "5px",
					cursor: "pointer",
					zIndex: 1000,
				}}
				onClick={installApp}
			>
				Install chatAlong
			</button>
		)
	);
}

// Define BeforeInstallPromptEvent type since it's not included in TypeScript's standard DOM typings
interface BeforeInstallPromptEvent extends Event {
	prompt: () => void;
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
