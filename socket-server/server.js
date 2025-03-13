const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "*", // Allow all origins (change this in production)
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("A user connected:", socket.id);
	socket.on("sendTypingSignal", (data) => {
		io.emit("receiveTypingSignal", data);
	});

	socket.on("sendMessage", (data) => {
		io.emit("receiveMessage", data);
	});

	socket.on("sendNotification", (data) => {
		console.log("Received Notification", data);
		io.emit("receiveNotification", data);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected:", socket.id);
	});
});

const PORT = 5000;
server.listen(PORT, () =>
	console.log(`Socket.io Server running on port ${PORT}`)
);
