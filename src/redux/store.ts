"use client";
import { userSlice } from "./slices/user";
import { postSlice } from "./slices/post";
import { postApi } from "./api-slices/post";
import { usersApi } from "./api-slices/user";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {
		User: userSlice.reducer,
		Post: postSlice.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[postApi.reducerPath]: postApi.reducer,
	},
	middleware: (defaultMiddleware) =>
		defaultMiddleware().concat(postApi.middleware).concat(usersApi.middleware),
});
export { store };
export type RootState = ReturnType<typeof store.getState>;
