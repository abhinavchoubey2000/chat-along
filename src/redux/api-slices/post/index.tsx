import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
	reducerPath: "postApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000",
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
		createPost: builder.mutation({
			query: (postObj: { post_image: string; caption: string }) => ({
				url: "api/create-post",
				method: "POST",
				body: {
					post_image: postObj.post_image,
					caption: postObj.caption,
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
	useCreatePostMutation,
	useUpdateLinkMutation,
	useDeletePostMutation,
} = postApi;
