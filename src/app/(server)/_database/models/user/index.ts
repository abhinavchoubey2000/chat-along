import mongoose, { Document, Schema } from "mongoose";

export interface UserSchemaInterface extends Document {
	name: string;
	email: string;
	password: string;
	phone: string;
	username: string;
	posts: [string];
	following: [string];
	followers: [string];
	image: { image_url: string; public_id: string };
	status: StatusInterface[];
	blocked_users: [string];
	notifications: Array<{
		action: string;
		image: { image_url: string; public_id: string };
		name: string;
		link: string;
	}>;
	chats: {
		[id: string]: Array<{
			name: string;
			image: { image_url: string; public_id: string };
			message: string;
			time: string;
			seen: boolean;
		}>;
	};
}

const userSchema: Schema = new mongoose.Schema<UserSchemaInterface>(
	{
		name: {
			type: String,
			required: [true, "Name is required."],
		},
		email: {
			type: String,
			required: [true, "Email is required."],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		phone: {
			type: String,
			required: [true, "Phone number is required"],
		},
		username: {
			type: String,
			required: [true, "Username is required"],
			unique: true,
		},
		posts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "posts",
			},
		],
		following: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "users",
			},
		],
		followers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "users",
			},
		],
		image: {
			image_url: String,
			public_id: String,
		},
		chats: {
			type: Object, // Ensure chats is an object
			default: {
				test: [],
			},
		},
		notifications: [],
		status: [
			{
				statusContent: String,
				statusId: mongoose.Schema.Types.ObjectId,
				colorCode: String,
				colorName: String,
			},
		],
		blocked_users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "users",
			},
		],
	},
	{ timestamps: true }
);

(mongoose.models as any) = {};

const userModel = mongoose.model<UserSchemaInterface>("users", userSchema);
export { userModel };
