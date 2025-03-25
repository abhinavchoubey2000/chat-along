self.addEventListener("install", (event) => {
	console.log("Service Worker installing...");
	self.skipWaiting();
});

self.addEventListener("push", (event) => {
	const data = event.data.json(); // Parse notification data
	self.registration.showNotification(data.title, {
		body: data.body,
		icon: data.icon,
		badge: "/logo.png",
		vibrate: [200, 100, 200],
		timestamp: Date.now(),
		data: data.data,
	});
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
	event.notification.close();
	const url = event.notification.data?.url || "/"; // Default to home if no URL
	event.waitUntil(clients.openWindow(url)); // Open the link in a new tab
});

self.addEventListener("activate", (event) => {
	console.log("Service Worker activated!");
});

self.addEventListener("fetch", (event) => {
	console.log("Fetching:", event.request.url);
});
