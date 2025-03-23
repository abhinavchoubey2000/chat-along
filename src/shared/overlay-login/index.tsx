"use client";

import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import Logo from "../../../public/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { handleDialog, storeUserDataInState } from "@/redux/slices/user";
import { useLoginMutation } from "@/redux/api-slices";
import React, { useState } from "react";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";

export function OverlayLogin() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const [login, { isLoading }] = useLoginMutation();
	const { isDialogOpened } = useSelector((state: RootState) => state.User);
	const closeDialog = () => {
		dispatch(handleDialog(false));
	};
	const processLogin = async () => {
		const response = await login({ username, password });
		dispatch(storeUserDataInState(response.data));
		window.location.href = "/";
	};
	return (
		<Dialog
			open={isDialogOpened}
			onClose={closeDialog}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogContent>
				<Box>
					<Stack py={1}>
						<Image src={Logo} alt="Logo" height={40} width={60} />
						<Typography variant="h5" fontWeight={"bold"}>
							LOG IN
						</Typography>
					</Stack>
					<Stack py={5}>
						<Typography
							textAlign={"center"}
							sx={{ opacity: 0.7 }}
							letterSpacing={1.5}
						>
							Opps!!! You need to be logged in to perform this action.
						</Typography>
						<TextField
							label="Username"
							name="username"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Password"
							name="password"
							type="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							fullWidth
							margin="normal"
						/>
						<Typography alignSelf={"end"}>
							Dont have account?{" "}
							<Link
								href={"/signup"}
								style={{ textDecoration: "none", color: "#06D001" }}
							>
								Let&apos;s create one
							</Link>
						</Typography>
						<Button
							sx={{ my: 2 }}
							variant="contained"
							color="primary"
							onClick={processLogin}
							fullWidth
						>
							{isLoading ? (
								<CircularProgress sx={{ color: "white" }} size={18} />
							) : (
								"LOGIN"
							)}
						</Button>
					</Stack>
				</Box>
			</DialogContent>
		</Dialog>
	);
}
