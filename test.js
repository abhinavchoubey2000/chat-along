// A testing file where I test my logics of project
const obj = [
	["test", []],
	[
		"67dff115ac432e6248e265fb",
		[
			{
				name: "Pikachu Pika Pika",
				image: {
					image_url:
						"https://res.cloudinary.com/duahyfkib/image/upload/v1742729492/pzvhl0wv6g7itiobq4h3.jpg",
					public_id: "pzvhl0wv6g7itiobq4h3",
				},
				senderId: "67dff115ac432e6248e265fb",
				message: "Hi Picka Pika",
				imageMessage: "",
				time: "02:09 AM",
				seen: true,
			},
			{
				name: "Pikachu Pika Pika",
				image: {
					image_url:
						"https://res.cloudinary.com/duahyfkib/image/upload/v1742729492/pzvhl0wv6g7itiobq4h3.jpg",
					public_id: "pzvhl0wv6g7itiobq4h3",
				},
				senderId: "67dff115ac432e6248e265fb",
				message: "Show me Picka Picka",
				imageMessage: "",
				time: "02:09 AM",
				seen: true,
			},
			{
				name: "Abhinav Choubey",
				image: {
					image_url:
						"https://res.cloudinary.com/duahyfkib/image/upload/v1742626034/vyjbpuh3laa57iulyv6b.jpg",
					public_id: "vyjbpuh3laa57iulyv6b",
				},
				message: "Wait",
				imageMessage: "",
				senderId: "67dbcde166026052bef71ff9",
				time: "02:10 AM",
				seen: false,
			},
			{
				name: "Abhinav Choubey",
				image: {
					image_url:
						"https://res.cloudinary.com/duahyfkib/image/upload/v1742626034/vyjbpuh3laa57iulyv6b.jpg",
					public_id: "vyjbpuh3laa57iulyv6b",
				},
				message: "",
				imageMessage:
					"https://res.cloudinary.com/duahyfkib/image/upload/v1742848811/vlpg8ubyy9sf1beval2x.jpg",
				senderId: "67dbcde166026052bef71ff9",
				time: "02:10 AM",
				seen: false,
			},
			{
				name: "Pikachu Pika Pika",
				image: {
					image_url:
						"https://res.cloudinary.com/duahyfkib/image/upload/v1742729492/pzvhl0wv6g7itiobq4h3.jpg",
					public_id: "pzvhl0wv6g7itiobq4h3",
				},
				senderId: "67dff115ac432e6248e265fb",
				message: "This is not me",
				imageMessage: "",
				time: "02:10 AM",
				seen: false,
			},
			{
				name: "Pikachu Pika Pika",
				image: {
					image_url:
						"https://res.cloudinary.com/duahyfkib/image/upload/v1742729492/pzvhl0wv6g7itiobq4h3.jpg",
					public_id: "pzvhl0wv6g7itiobq4h3",
				},
				senderId: "67dff115ac432e6248e265fb",
				message: "Pikkkkaaaaaaaaaaaaaaaaaaaaa",
				imageMessage: "",
				time: "02:10 AM",
				seen: true,
			},
		],
	],
	[
		"67e00973f8b9996599c27728",
		[
			{
				name: "Abhinav Choubey",
				image: {
					image_url:
						"https://res.cloudinary.com/duahyfkib/image/upload/v1742626034/vyjbpuh3laa57iulyv6b.jpg",
					public_id: "vyjbpuh3laa57iulyv6b",
				},
				message: "Bhai so gya kya?",
				imageMessage: "",
				senderId: "67dbcde166026052bef71ff9",
				time: "02:56 AM",
				seen: true,
			},
			{
				name: "Abhinav Choubey",
				image: {
					image_url:
						"https://res.cloudinary.com/duahyfkib/image/upload/v1742626034/vyjbpuh3laa57iulyv6b.jpg",
					public_id: "vyjbpuh3laa57iulyv6b",
				},
				message: "",
				imageMessage:
					"https://res.cloudinary.com/duahyfkib/image/upload/v1742851879/jwqpzrd9cgsk0aszs2nm.jpg",
				senderId: "67dbcde166026052bef71ff9",
				time: "03:01 AM",
				seen: true,
			},
		],
	],
	[
		"67e0e3e0566cd26925e14687",
		[
			{
				name: "Abhinav Choubey",
				image: {
					image_url:
						"https://res.cloudinary.com/duahyfkib/image/upload/v1742626034/vyjbpuh3laa57iulyv6b.jpg",
					public_id: "vyjbpuh3laa57iulyv6b",
				},
				message: "Are you there bro?",
				imageMessage: "",
				senderId: "67dbcde166026052bef71ff9",
				time: "03:05 AM",
				seen: true,
			},
		],
	],
];

const a = obj.slice(1, obj.length).filter((user) => {
	const messages = user[1];
	return messages[messages.length - 1].seen === false;
}).length
console.log(a);
