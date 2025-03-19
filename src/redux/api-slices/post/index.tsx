import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
	reducerPath: "postApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
	}),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: "api/login",
				method: "POST",
				body: { email: credentials.email, password: credentials.password },
			}),
		}),
		signup: builder.mutation({
			query: (credentials) => ({
				url: "/api/signup",
				method: "POST",
				body: {
					email: credentials.email,
					password: credentials.password,
					name: credentials.name,
				},
			}),
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: "api/logout",
				method: "DELETE",
			}),
		}),
		fetchPublicPostsData: builder.query<{ data: Array<PostInterface> }, void>({
			query: () => "api/get-all-posts",
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
		updateLink: builder.mutation({
			query: (updatedLinkObj: {
				url: string;
				fullname: string;
				id: string;
				linkColor: string;
			}) => ({
				url: "api/update-link",
				method: "PUT",
				body: {
					url: updatedLinkObj.url,
					fullname: updatedLinkObj.fullname,
					id: updatedLinkObj.id,
					linkColor: updatedLinkObj.linkColor,
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
	useLoginMutation,
	useSignupMutation,
	useLogoutMutation,
	useUploadImageToCloudinaryMutation,
	useDeleteImageFromCloudinaryMutation,
	useCreatePostMutation,
	useUpdateLinkMutation,
	useDeletePostMutation,
} = postApi;
