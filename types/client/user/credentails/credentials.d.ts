interface UserResponseDataInterface {
	_id?: string;
	name?: string;
	email?: string;
	password?: string;
	phone?: string;
	username?: string;
	posts?: Array<PostInterface>;
	following?: Array<FollowingInterface>;
	followers?: Array<FollowersInterface>;
	image?: { image_url: string; public_id: string };
	blocked_users?: Array<BlockedUsersInterface>;
	status?: Array<StatusInterface>;
	chats?: ChatsInterface;
	notifications?: Array<NotificationInterface>;
}

interface FollowingInterface {
	_id: string;
	name: string;
	image: { image_url: string; public_id: string };
	username: string;
	status?: Array<StatusInterface>;
}

interface FollowersInterface {
	_id: string;
	name: string;
	image: { image_url: string; public_id: string };
	username: string;
}

interface BlockedUsersInterface {
	_id: string;
	name: string;
	image: { image_url: string; public_id: string };
	username: string;
}

interface StatusInterface {
	_id?: string;
	statusContent: string;
	colorName: string;
	colorCode: string;
}

interface ChatsInterface {
	[id: string]: Array<{
		name: string;
		image: { image_url: string; public_id: string };
		message: string;
		time: string;
		seen: boolean;
	}>;
}

interface NotificationInterface {
	name: string;
	image: { image_url: string; public_id: string };
	action: string;
	link: string;
}
