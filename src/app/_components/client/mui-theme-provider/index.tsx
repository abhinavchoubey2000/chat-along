"use client";

import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getTheme } from "../mui-theme";

export function MUIThemeProvider({ children }: { children: React.ReactNode }) {
	const { userData } = useSelector((state: RootState) => state.User); // Get mode from Redux
	const theme = getTheme(userData.settings?.darkMode || false); // Dynamically create theme based on mode

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
