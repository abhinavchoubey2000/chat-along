/// <reference types="next" />
/// <reference types="next/image-types/global" />

interface SignupRequestDataInterface {
	email: string;
	password: string;
	image: { image_url: string; public_id: string };
	name: string;
	phone: string;
	username: string;
}

interface SaveDataFunctionInterface {
	(data: SignupRequestDataInterface): void;
}

interface GenerateUsernameFunctionInterface {
	(firstName: string, phone: string): String;
}
