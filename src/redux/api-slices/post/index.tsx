import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
	reducerPath: "postApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
	}),
	endpoints: (builder) => ({
		fetchPublicPostsData: builder.query<{ data: Array<PostInterface> }, void>({
			query: () => "api/get-all-posts",
		}),
		viewUserPost: builder.mutation({
			query: (postId: string) => ({
				url: `api/view-user-post`,
				method: "POST",
				body: {
					postId,
				},
			}),
		}),
		uploadImageToCloudinary: builder.mutation({
			query: (formData) => ({
				url: "https://chat-along-external-server.onrender.com/upload-to-cloudinary",
				method: "POST",
				body: formData,
			}),
		}),
		deleteImageFromCloudinary: builder.mutation({
			query: (public_id: string) => ({
				url: "https://chat-along-external-server.onrender.com/delete-from-cloudinary",
				method: "POST",
				body: { public_id },
			}),
		}),
		createPost: builder.mutation({
			query: (postObj: {
				post_image: { image_url: string; public_id: string };
				caption: string;
				date: string;
			}) => ({
				url: "api/create-post",
				method: "POST",
				body: {
					post_image: postObj.post_image,
					caption: postObj.caption,
					date: postObj.date,
				},
			}),
		}),
		deletePost: builder.mutation({
			query: (postId: string) => ({
				url: `api/delete-post`,
				method: "DELETE",
				body: {
					postId,
				},
			}),
		}),
		editCaption: builder.mutation({
			query: (data: { postId: string; caption: string }) => ({
				url: `api/edit-post-caption`,
				method: "PATCH",
				body: {
					postId: data.postId,
					caption: data.caption,
				},
			}),
		}),
		likeUnlikePost: builder.mutation({
			query: (postId: string) => ({
				url: `api/like-unlike-post`,
				method: "PUT",
				body: {
					postId,
				},
			}),
		}),
		commentPost: builder.mutation({
			query: (data: { postId: string; comment: string }) => ({
				url: `api/comment-post`,
				method: "POST",
				body: {
					postId: data.postId,
					comment: data.comment,
				},
			}),
		}),
	}),
});

export const {
	useFetchPublicPostsDataQuery,
	useLikeUnlikePostMutation,
	useCommentPostMutation,
	useUploadImageToCloudinaryMutation,
	useDeleteImageFromCloudinaryMutation,
	useCreatePostMutation,
	useEditCaptionMutation,
	useViewUserPostMutation,
	useDeletePostMutation,
} = postApi;
