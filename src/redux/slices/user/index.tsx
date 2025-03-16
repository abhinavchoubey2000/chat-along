import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatsDataInterface {
	[id: string]: Array<{
		name: string;
		image: string;
		message: string;
		time: string;
		seen: boolean;
	}>;
}

interface NotificationDataInterface {
	senderName: string;
	senderImage: string;
	action: string;
	link: string;
}

interface InitialStateInterface {
	userData: UserResponseDataInterface;
	allUsersData: Array<UserResponseDataInterface>;
	loading: boolean;
	isAuthenticated: boolean;
	isDialogOpened: boolean;
	chats: ChatsDataInterface;
	notifications: Array<NotificationDataInterface>;
}

const initialState: InitialStateInterface = {
	userData: {},
	allUsersData: [],
	loading: true,
	isAuthenticated: false,
	isDialogOpened: false,
	chats: {},
	notifications: [],
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
				image: string;
				username: string;
			}>
		) => {
			// Checking if user already followed then unfollow
			let alreadyFollowing = state.userData.following?.find(
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
				});

				// Second person
				matchedUser?.followers?.push({
					_id: state.userData._id || "",
					name: state.userData.name || "",
					image: state.userData.image || "",
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
				time: string;
				message: string;
				image: string;
			}>
		) => {
			if (!state.chats[action.payload.receiverId]) {
				state.chats[action.payload.receiverId] = [];
			}

			state.chats[action.payload.receiverId].push({
				message: action.payload.message,
				image: action.payload.image,
				time: action.payload.time,
				name: "sender",
				seen: false,
			});
		},
		receiveMessageInState: (
			state,
			action: PayloadAction<{
				senderId: string;
				time: string;
				message: string;
				image: string;
			}>
		) => {
			if (!state.chats[action.payload.senderId]) {
				state.chats[action.payload.senderId] = [];
			}
			state.chats[action.payload.senderId].push({
				message: action.payload.message,
				image: action.payload.image,
				time: action.payload.time,
				name: "receiver",
				seen: false,
			});
		},
		receiveNotificationInState: (
			state,
			action: PayloadAction<NotificationDataInterface>
		) => {
			state.notifications.push({
				senderName: action.payload.senderName,
				senderImage: action.payload.senderImage,
				action: action.payload.action,
				link: action.payload.link,
			});
		},
		seenMessageInState: (state, action: PayloadAction<string>) => {
			const userId = action.payload;
			if (state.chats[userId]) {
				state.chats[userId][state.chats[userId].length - 1].seen = true;
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
	receiveNotificationInState,
	addStatusInState,
	deleteStatusInState,
	seenMessageInState,
	changeLoadingState,
} = userSlice.actions;
