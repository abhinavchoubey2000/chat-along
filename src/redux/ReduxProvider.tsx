"use client";
import { store } from "./store";
import { Provider } from "react-redux";

interface ReduxProviderProps {
	children: React.ReactNode;
}
export const ReduxProvider = ({ children }: ReduxProviderProps) => {
	return <Provider store={store}> {children}</Provider>;
};
