interface UserStatusPropsInterface {
	statusArray: Array<UserStatusArrayOfObjectInterface>;
}
interface UserStatusArrayOfObjectInterface {
	username: string;
	image: { image_url: string; public_id: string };
	status: Array<UserStatusObjectInterface>;
}
interface UserStatusObjectInterface {
	_id: number;
	statusContent: string;
	bgColor: string;
}
