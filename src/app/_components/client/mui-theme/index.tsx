"use client";
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: boolean) =>
	createTheme({
		palette: {
			mode: mode ? "dark" : "light",
			primary: {
				main: "#046af2",
			},
			secondary: {
				main: "#06D001",
			},
		},
	});
