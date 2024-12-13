import mongoose, { Document, Schema } from "mongoose";

export interface PostSchemaInterface extends Document {
	creator: mongoose.Schema.Types.ObjectId;
	post_image: string;
	caption: string;
	likes: [string];
	comments: [object];
}

const postSchema: Schema = new mongoose.Schema<PostSchemaInterface>(
	{
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
			required: [true, "Creator Id is required"],
		},
		post_image: {
			type: String,
			required: [true, "Post image is required"],
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

(mongoose.models as any) = {};

const postModel = mongoose.model<PostSchemaInterface>("posts", postSchema);
export { postModel };
