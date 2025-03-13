interface UserStatusPropsInterface {
	statusArray: Array<UserStatusArrayOfObjectInterface>;
}
interface UserStatusArrayOfObjectInterface {
	username: string;
	image: string;
	status: Array<UserStatusObjectInterface>;
}
interface UserStatusObjectInterface {
	_id: number;
	statusContent: string;
	bgColor: string;
}
