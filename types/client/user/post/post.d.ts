interface PostCreatorInterface {
	_id: string;
	name: string;
	username: string;
	image: string;
}

interface PostCommentUserInterface {
	_id: string;
	name: string;
	username: string;
	image: string;
}

interface PostCommentsInterface {
	userId: PostCommentUserInterface;
	comment: string;
	_id?:string
}

interface PostLikesInterface {
	_id: string;
	username: string;
	name: string;
	image: string;
}

interface PostInterface {
	_id?:string
	creator?: PostCreatorInterface;
	post_image?: string;
	caption?: string;
	likes?: Array<PostLikesInterface>;
	comments?: Array<PostCommentsInterface>;
	// date: string;
}
