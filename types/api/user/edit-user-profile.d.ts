/// <reference types="next" />
/// <reference types="next/image-types/global" />

interface EditUserProfileRequestDataInterface {
	email: string;
	image: { image_url: string; public_id: string };
	name: string;
	phone: string;
}
