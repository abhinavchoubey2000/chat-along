import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateInterface {
	postsData: Array<PostInterface>;
	loading: boolean;
}

const initialState: InitialStateInterface = {
	postsData: [],
	loading: false,
};

export const postSlice = createSlice({
	name: "Post",
	initialState,
	reducers: {
		storePublicPostDataInState: (
			state,
			action: PayloadAction<Array<PostInterface>>
		) => {
			state.postsData = action.payload;
		},
		deletePostFromState: (state, action: PayloadAction<string>) => {
			state.postsData = state.postsData.filter(
				(post) => post._id !== action.payload
			);
		},
		likeUnlikePostInState: (
			state,
			action: PayloadAction<{
				likesDetails: PostLikesInterface;
				postId: string;
			}>
		) => {
			const foundPost = state.postsData.find(
				(post) => post._id === action.payload.postId
			);
			const isLikedByUser = foundPost?.likes?.find(
				(like) => like._id === action.payload.likesDetails._id
			);
			if (!isLikedByUser) {
				foundPost?.likes?.push({
					_id: action.payload.likesDetails._id,
					image: action.payload.likesDetails.image,
					name: action.payload.likesDetails.name,
					username: action.payload.likesDetails.username,
				});
			} else {
				const likedByUserIndex = foundPost?.likes?.findIndex(
					(like) => like._id === action.payload.likesDetails._id
				);
				state.postsData
					.find((post) => post._id === action.payload.postId)
					?.likes?.splice(likedByUserIndex || 0, 1);
			}
		},
		commentPostInState: (
			state,
			action: PayloadAction<{
				commentDetails: PostCommentsInterface;
				postId: string;
			}>
		) => {
			const foundPost = state.postsData.find(
				(post) => post._id === action.payload.postId
			);
			foundPost?.comments?.push({
				comment: action.payload.commentDetails.comment,
				userId: {
					name: action.payload.commentDetails.userId.name,
					_id: action.payload.commentDetails.userId._id,
					username: action.payload.commentDetails.userId.username,
					image: action.payload.commentDetails.userId.image,
				},
			});
		},
		changeLoadingState: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
});

export const {
	storePublicPostDataInState,
	changeLoadingState,
	deletePostFromState,
	likeUnlikePostInState,
	commentPostInState,
} = postSlice.actions;
