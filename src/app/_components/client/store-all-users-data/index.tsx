"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetchAllUsersDataQuery } from "@/redux/api-slices";
import {
	changeLoadingState,
	storeAllUsersDataInState,
} from "@/redux/slices/user";

export function StoreAllUsersData() {
	// Hooks
	const dispatch = useDispatch();
	const { data, isLoading } = useFetchAllUsersDataQuery();

	useEffect(() => {
		dispatch(changeLoadingState(isLoading));
		if (!isLoading && data) {
			dispatch(storeAllUsersDataInState(data.data));
			dispatch(changeLoadingState(isLoading));
		}
	}, [data, isLoading, dispatch]);

	return <></>;
}
