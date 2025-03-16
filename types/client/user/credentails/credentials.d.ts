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
	image?: string;
	blocked_users?: Array<BlockedUsersInterface>;
	status?: Array<StatusInterface>;
}

interface FollowingInterface {
	_id: string;
	name: string;
	image: string;
	username: string;
	status?: Array<StatusInterface>;
}

interface FollowersInterface {
	_id: string;
	name: string;
	image: string;
	username: string;
}

interface BlockedUsersInterface {
	_id: string;
	name: string;
	image: string;
	username: string;
}

interface StatusInterface {
	_id?: string;
	statusContent: string;
	colorName: string;
	colorCode: string;
}
