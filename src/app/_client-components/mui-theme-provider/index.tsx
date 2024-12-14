'use client'

import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../mui-theme";

export function MUIThemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
