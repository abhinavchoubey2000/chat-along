// A testing file where I test my logics of project
const obj = {
	"67e185ce7bfb20d049889932": [
		{
			name: "Abhinav Choubey",
			image: {
				image_url:
					"https://res.cloudinary.com/duahyfkib/image/upload/v1742626034/vyjbpuh3laa57iulyv6b.jpg",
				public_id: "vyjbpuh3laa57iulyv6b",
			},
			message: "Hey Lois",
			senderId: "67dbcde166026052bef71ff9",
			time: "10:51 PM",
			seen: false,
		},
		{
			name: "Luis Thomson",
			image: {
				image_url:
					"https://res.cloudinary.com/duahyfkib/image/upload/v1742833100/xdk3wksmmqsy6nqi8jnd.jpg",
				public_id: "xdk3wksmmqsy6nqi8jnd",
			},
			senderId: "67e185ce7bfb20d049889932",
			message: "Hey Abhinav.....Btw its Luis not Lois",
			time: "10:53 PM",
			seen: true,
		},
	],
	"67dff115ac432e6248e265fb": [
		{
			name: "Abhinav Choubey",
			image: {
				image_url:
					"https://res.cloudinary.com/duahyfkib/image/upload/v1742626034/vyjbpuh3laa57iulyv6b.jpg",
				public_id: "vyjbpuh3laa57iulyv6b",
			},
			message: "Hey Nigga",
			senderId: "67dbcde166026052bef71ff9",
			time: "11:15 PM",
			seen: false,
		},
	],
};

Object.entries(obj).map((chat) => {
	console.log(chat[1][0]);
});
