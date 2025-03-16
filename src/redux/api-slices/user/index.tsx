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
		addStatus: builder.mutation({
			query: (data: {
				statusContent: string;
				colorName: string;
				colorCode: string;
			}) => ({
				url: "api/add-status",
				method: "POST",
				body: {
					statusContent: data.statusContent,
					colorCode: data.colorCode,
					colorName: data.colorName,
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
		deleteStatus: builder.mutation({
			query: (statusId) => ({
				url: `api/delete-status`,
				method: "DELETE",
				body: {
					statusId,
				},
			}),
		}),
	}),
});

export const {
	useFetchUserDataQuery,
	useFetchAllUsersDataQuery,
	useLoginMutation,
	useCheckEmailInDBMutation,
	useCheckUsernameInDBMutation,
	useSignupMutation,
	useLogoutMutation,
	useFollowUnfollowUserMutation,
	useAddStatusMutation,
	useEditProfileMutation,
	useDeleteStatusMutation,
} = usersApi;
