import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateInterface {
	userData: UserResponseDataInterface;
	allUsersData: Array<UserResponseDataInterface>;
	loading: boolean;
	isAuthenticated: boolean;
	isDialogOpened: boolean;
}

const initialState: InitialStateInterface = {
	userData: {},
	allUsersData: [],
	loading: true,
	isAuthenticated: false,
	isDialogOpened: false,
};

export const userSlice = createSlice({
	name: "Users",
	initialState,
	reducers: {
		storeUserDataInState: (
			state,
			action: PayloadAction<UserResponseDataInterface>
		) => {
			state.userData = action.payload;
		},
		storeAllUsersDataInState: (
			state,
			action: PayloadAction<Array<UserResponseDataInterface>>
		) => {
			state.allUsersData = action.payload;
		},
		followUnfollowUserInState: (
			state,
			action: PayloadAction<{
				_id: string;
				name: string;
				image: { image_url: string; public_id: string };
				username: string;
				status: Array<StatusInterface>;
			}>
		) => {
			// Checking if user already followed then unfollow
			const alreadyFollowing = state.userData.following?.find(
				(user) => user._id === action.payload._id
			);
			const matchedUser = state.allUsersData.find(
				(user) => user._id === action.payload._id
			);

			if (alreadyFollowing) {
				// First person
				const followingIndex = state.userData.following?.findIndex(
					(user) => user._id === action.payload._id
				);
				state.userData.following?.splice(Number(followingIndex), 1);

				// Second person
				const followerIndex = matchedUser?.followers?.find(
					(user) => user._id === state.userData._id
				);
				matchedUser?.followers?.splice(Number(followerIndex), 1);
			} else {
				// First person
				state.userData.following?.push({
					_id: action.payload._id,
					name: action.payload.name,
					image: action.payload.image,
					username: action.payload.username,
					status: action.payload.status,
				});

				// Second person
				matchedUser?.followers?.push({
					_id: state.userData._id || "",
					name: state.userData.name || "",
					image: state.userData.image || { image_url: "", public_id: "" },
					username: state.userData.username || "",
				});
			}
		},
		handleAuthentication: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticated = action.payload;
		},
		handleDialog: (state, action: PayloadAction<boolean>) => {
			state.isDialogOpened = action.payload;
		},
		changeLoadingState: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		sendMessageInState: (
			state,
			action: PayloadAction<{
				receiverId: string;
				senderId: string;
				name: string;
				time: string;
				message: string;
				imageMessage: string;
				image: { image_url: string; public_id: string };
			}>
		) => {
			if (!state.userData.chats) {
				state.userData.chats = {}; // Initialize chats as an empty object
			}
			if (!state.userData.chats?.[action.payload.receiverId]) {
				state.userData.chats[action.payload.receiverId] = [];
			}

			state.userData.chats?.[action.payload.receiverId].push({
				message: action.payload.message,
				imageMessage: action.payload.imageMessage,
				image: action.payload.image,
				time: action.payload.time,
				name: action.payload.name,
				senderId: action.payload.senderId,
				seen: false,
			});
		},
		receiveMessageInState: (
			state,
			action: PayloadAction<{
				senderId: string;
				time: string;
				name: string;
				message: string;
				imageMessage: string;
				image: { image_url: string; public_id: string };
			}>
		) => {
			if (!state.userData.chats) {
				state.userData.chats = {}; // Initialize chats as an empty object
			}
			if (!state.userData.chats?.[action.payload.senderId]) {
				state.userData.chats[action.payload.senderId] = [];
			}
			state.userData.chats?.[action.payload.senderId].push({
				message: action.payload.message,
				imageMessage: action.payload.imageMessage,
				image: action.payload.image,
				time: action.payload.time,
				name: action.payload.name,
				senderId: action.payload.senderId,
				seen: false,
			});
		},
		clearMessagesInState: (state, action: PayloadAction<string>) => {
			if (!state.userData.chats) {
				state.userData.chats = {}; // Initialize chats as an empty object
			}
			if (!state.userData.chats?.[action.payload]) {
				state.userData.chats[action.payload] = [];
			}
			state.userData.chats[action.payload] = [];
		},
		receiveNotificationInState: (
			state,
			action: PayloadAction<NotificationInterface>
		) => {
			if (!state.userData.notifications) {
				state.userData.notifications = [];
			}
			state.userData.notifications.push({
				name: action.payload.name,
				image: action.payload.image,
				action: action.payload.action,
				link: action.payload.link,
			});
		},
		clearNotificationsInState: (state) => {
			state.userData.notifications = [];
		},
		seenMessageInState: (state, action: PayloadAction<string>) => {
			const userId = action.payload;
			if (state.userData.chats?.[userId]) {
				state.userData.chats[userId][
					state.userData.chats[userId].length - 1
				].seen = true;
			}
		},
		addStatusInState: (state, action: PayloadAction<StatusInterface>) => {
			if (state.userData.status) {
				state?.userData?.status.push({
					statusContent: action.payload.statusContent,
					colorCode: action.payload.colorCode,
					colorName: action.payload.colorName,
					_id: String(state.userData.status?.length + 1),
				});
			}
		},
		deleteStatusInState: (state, action: PayloadAction<string>) => {
			if (state.userData.status) {
				const indexOfStatus = state.userData.status.findIndex(
					(status) => status._id === action.payload
				);

				state.userData.status.splice(Number(indexOfStatus), 1);
			}
		},
		changeDarkModeInState: (state) => {
			if (state.userData.settings) {
				state.userData.settings.darkMode = !state.userData.settings?.darkMode;
			}
		},
		changePopUpInState: (state) => {
			if (state.userData.settings) {
				state.userData.settings.popUp = !state.userData.settings?.popUp;
			}
		},
		changeSoundInState: (state) => {
			if (state.userData.settings) {
				state.userData.settings.sound = !state.userData.settings?.sound;
			}
		},
	},
});

export const {
	storeUserDataInState,
	storeAllUsersDataInState,
	followUnfollowUserInState,
	handleAuthentication,
	handleDialog,
	sendMessageInState,
	receiveMessageInState,
	changeDarkModeInState,
	changePopUpInState,
	changeSoundInState,
	clearMessagesInState,
	receiveNotificationInState,
	clearNotificationsInState,
	addStatusInState,
	deleteStatusInState,
	seenMessageInState,
	changeLoadingState,
} = userSlice.actions;
