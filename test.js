const chats = {
	hardy: [
		{
			name: "You",
			image: "Image",
			time: "2:34 PM",
			message: "This is my message",
		},
		{
			name: "Hardy",
			image: "Image",
			time: "2:34 PM",
			message: "This is my message",
		},
		{
			name: "You",
			image: "Image",
			time: "2:34 PM",
			message: "This is my message",
		},
	],
	abhinav: [
		{
			name: "You",
			image: "Image",
			time: "2:34 PM",
			message: "This is my message",
		},
		{
			name: "abhinav",
			image: "Image",
			time: "2:34 PM",
			message: "This is my message",
		},
	],
};

chats["Hello"].push({
			name: "abhinav",
			image: "Image",
			time: "2:34 PM",
			message: "This is pushed msg",
		})
chats.abhinav.push({
			name: "abhinav",
			image: "Image",
			time: "2:34 PM",
			message: "This is pushed msg 2",
		})
console.log(chats)