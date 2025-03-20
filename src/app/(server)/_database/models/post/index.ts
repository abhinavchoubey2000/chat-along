import mongoose, { Document, Schema } from "mongoose";

export interface PostSchemaInterface extends Document {
	creator: mongoose.Schema.Types.ObjectId;
	post_image: { image_url: string; public_id: string };
	caption: string;
	likes: [string];
	comments: [object];
	date: string;
}

const postSchema: Schema = new mongoose.Schema<PostSchemaInterface>(
	{
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
			required: [true, "Creator Id is required"],
		},
		date: String,
		post_image: {
			image_url: String,
			public_id: String,
		},
		caption: {
			type: String,
			required: [true, "Post caption is required"],
		},
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
		comments: [
			{
				comment: String,
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "users",
				},
			},
		],
	},
	{ timestamps: true }
);

(mongoose.models as object) = {};

const postModel = mongoose.model<PostSchemaInterface>("posts", postSchema);
export { postModel };
