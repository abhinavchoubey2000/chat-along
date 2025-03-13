"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetchUserDataQuery } from "@/redux/api-slices";
import {
	changeLoadingState,
	storeUserDataInState,
	handleAuthentication,
} from "@/redux/slices/user";

export function StoreUserData() {
	// Hooks
	const dispatch = useDispatch();
	const { data, isLoading } = useFetchUserDataQuery();

	useEffect(() => {
		dispatch(changeLoadingState(isLoading));
		if (!isLoading && data) {
			if(data.data){
				dispatch(storeUserDataInState(data.data));
				dispatch(handleAuthentication(true));
				dispatch(changeLoadingState(isLoading));
			}
		}
	}, [data, isLoading, dispatch]);

	return <></>;
}
