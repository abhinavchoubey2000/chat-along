import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000",
	}),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data: { username: string; password: string }) => ({
				url: "api/login",
				method: "POST",
				body: { username: data.username, password: data.password },
			}),
		}),
		checkEmailInDB: builder.mutation({
			query: (email: string) => ({
				url: "api/check-email",
				method: "POST",
				body: { email },
			}),
		}),
		checkUsernameInDB: builder.mutation({
			query: (data: {
				firstName: string;
				phone: string;
				username: string;
			}) => ({
				url: "api/check-username",
				method: "POST",
				body: {
					firstName: data.firstName,
					phone: data.phone,
					username: data.username,
				},
			}),
		}),
		signup: builder.mutation({
			query: (data: {
				email: string;
				password: string;
				name: string;
				image: string;
				username: string;
				phone: string;
			}) => ({
				url: "/api/signup",
				method: "POST",
				body: {
					email: data.email,
					password: data.password,
					name: data.name,
					image: data.image,
					username: data.username,
					phone: data.phone,
				},
			}),
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: "api/logout",
				method: "DELETE",
			}),
		}),
		fetchUserData: builder.query<{ data: UserResponseDataInterface }, void>({
			query: () => "api/get-user-profile",
		}),
		fetchAllUsersData: builder.query<
			{ data: Array<UserResponseDataInterface> },
			void
		>({
			query: () => "api/get-all-users",
		}),
		followUnfollowUser: builder.mutation({
			query: (userId: string) => ({
				url: `api/follow-unfollow-user`,
				method: "PUT",
				body: {
					userId,
				},
			}),
		}),
		addLink: builder.mutation({
			query: (linkObj: {
				url: string;
				fullname: string;
				linkColor: string;
			}) => ({
				url: "api/add-link",
				method: "POST",
				body: {
					url: linkObj.url,
					fullname: linkObj.fullname,
					linkColor: linkObj.linkColor,
				},
			}),
		}),
		editProfile: builder.mutation({
			query: (data: {
				image: string;
				name: string;
				email: string;
				phone: string;
			}) => ({
				url: "api/edit-user-profile",
				method: "PUT",
				body: {
					image: data.image,
					name: data.name,
					email: data.email,
					phone: data.phone,
				},
			}),
		}),
		deleteLink: builder.mutation({
			query: (linkId) => ({
				url: `api/delete-link/${linkId}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	// User Api Slices
	useFetchUserDataQuery,
	useFetchAllUsersDataQuery,
	useLoginMutation,
	useCheckEmailInDBMutation,
	useCheckUsernameInDBMutation,
	useSignupMutation,
	useLogoutMutation,
	useFollowUnfollowUserMutation,
	useAddLinkMutation,
	useEditProfileMutation,
	useDeleteLinkMutation,
} = usersApi;
