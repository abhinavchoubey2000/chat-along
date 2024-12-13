/// <reference types="next" />
/// <reference types="next/image-types/global" />

interface SignupRequestDataInterface {
	email: String;
	password: String;
	image: String;
	name: String;
	phone: String;
	username: String;
}

interface SaveDataFunctionInterface {
	(data: SignupRequestDataInterface): void;
}

interface GenerateUsernameFunctionInterface {
	(name: String, phone: String): String;
}
