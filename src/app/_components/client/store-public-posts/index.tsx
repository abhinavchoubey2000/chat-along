"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetchPublicPostsDataQuery } from "@/redux/api-slices/post";
import {
	changeLoadingState,
	storePublicPostDataInState,
} from "@/redux/slices/post";

export function StorePublicPosts() {
	// Hooks
	const dispatch = useDispatch();
	const { data, isLoading } = useFetchPublicPostsDataQuery();

	useEffect(() => {
		dispatch(changeLoadingState(isLoading));
		if (!isLoading && data) {
			
			dispatch(storePublicPostDataInState(data.data));
			dispatch(changeLoadingState(isLoading));
		}
	}, [data, isLoading, dispatch]);

	return <></>;
}
