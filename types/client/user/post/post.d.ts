interface PostCreatorInterface {
	_id: string;
	name: string;
	username: string;
	image: { image_url: string; public_id: string };
}

interface PostCommentUserInterface {
	_id: string;
	name: string;
	username: string;
	image: { image_url: string; public_id: string };
}

interface PostCommentsInterface {
	userId: PostCommentUserInterface;
	comment: string;
	_id?: string;
}

interface PostLikesInterface {
	_id: string;
	username: string;
	name: string;
	image: { image_url: string; public_id: string };
}

interface PostInterface {
	_id?: string;
	creator?: PostCreatorInterface;
	post_image?: { image_url: string; public_id: string };
	caption?: string;
	date?: string;
	likes?: Array<PostLikesInterface>;
	comments?: Array<PostCommentsInterface>;
}
