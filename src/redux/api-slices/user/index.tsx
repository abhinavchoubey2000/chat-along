import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
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
				image: { image_url: string; public_id: string };
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
		replaceImageInCloudinary: builder.mutation({
			query: (formData) => ({
				url: "https://chat-along-external-server.onrender.com/replace-in-cloudinary",
				method: "POST",
				body: formData,
			}),
		}),
		editProfile: builder.mutation({
			query: (data: {
				image: { image_url: string; public_id: string };
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
		saveMessage: builder.mutation({
			query: (data: {
				receiverId: string;
				time: string;
				message: string;
				imageMessage: string;
				name: string;
				senderId: string;
				image: { image_url: string; public_id: string };
			}) => ({
				url: `api/save-message`,
				method: "POST",
				body: {
					receiverId: data.receiverId,
					time: data.time,
					image: data.image,
					message: data.message,
					imageMessage: data.imageMessage,
					name: data.name,
					senderId: data.senderId,
				},
			}),
		}),
		saveSettings: builder.mutation({
			query: (data: { popUp: boolean; sound: boolean; darkMode: boolean }) => ({
				url: `api/save-settings`,
				method: "PUT",
				body: {
					popUp: data.popUp,
					sound: data.sound,
					darkMode: data.darkMode,
				},
			}),
		}),
		saveSeenMessage: builder.mutation({
			query: (userId: string) => ({
				url: `api/seen-message`,
				method: "PUT",
				body: {
					userId,
				},
			}),
		}),
		clearMessages: builder.mutation({
			query: (receiverId: string) => ({
				url: `api/clear-messages`,
				method: "POST",
				body: {
					receiverId,
				},
			}),
		}),
		saveNotification: builder.mutation({
			query: (data: {
				action: string;
				link: string;
				senderName: string;
				receiverId: string;
				image: { image_url: string; public_id: string };
			}) => ({
				url: `api/save-notification`,
				method: "POST",
				body: {
					receiverId: data.receiverId,
					link: data.link,
					image: data.image,
					senderName: data.senderName,
					action: data.action,
				},
			}),
		}),
		clearNotifications: builder.mutation<void, void>({
			query: () => ({
				url: `api/clear-notifications`,
				method: "PUT",
			}),
		}),

		viewUserProfile: builder.mutation({
			query: (username) => ({
				url: `api/view-user-profile`,
				method: "POST",
				body: { username },
			}),
		}),
		forgotPassword: builder.mutation({
			query: (data: { email: string; password: string; username: string }) => ({
				url: `api/forgot-password`,
				method: "PUT",
				body: {
					password: data.password,
					email: data.email,
					username: data.username,
				},
			}),
		}),
	}),
});

export const {
	useFetchUserDataQuery,
	useForgotPasswordMutation,
	useFetchAllUsersDataQuery,
	useLoginMutation,
	useCheckEmailInDBMutation,
	useCheckUsernameInDBMutation,
	useSignupMutation,
	useLogoutMutation,
	useFollowUnfollowUserMutation,
	useAddStatusMutation,
	useReplaceImageInCloudinaryMutation,
	useEditProfileMutation,
	useDeleteStatusMutation,
	useSaveMessageMutation,
	useSaveSettingsMutation,
	useClearMessagesMutation,
	useSaveNotificationMutation,
	useClearNotificationsMutation,
	useViewUserProfileMutation,
	useSaveSeenMessageMutation,
} = usersApi;
