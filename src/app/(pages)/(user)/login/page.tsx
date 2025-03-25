"use client";

import {
	Box,
	Button,
	CircularProgress,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { useLoginMutation } from "@/redux/api-slices";
import { useDispatch } from "react-redux";
import { storeUserDataInState } from "@/redux/slices/user";
import Logo from "../../../../../public/logo.png";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Login() {
	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const processLogin = async () => {
		const response = await login({ username, password });

		if (!response.data.success) {
			return toast.error(response.data.message);
		}
		dispatch(storeUserDataInState(response.data));
		window.location.href = "/";
	};
	return (
		<Box px={[2, 0]}>
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
					letterSpacing={[1, 1.5]}
				>
					Hi, welcome back. Login to your account with your credentials.
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
				<Stack direction={["column","row"]} justifyContent={"space-between"} >
					<Link
						href={"/forgot-password"}
						style={{ textDecoration: "none", color: "#046af2" }}
					>
						Forgot password?
					</Link>

					<Typography alignSelf={"end"}>
						Dont have account?{" "}
						<Link
							href={"/signup"}
							style={{ textDecoration: "none", color: "#06D001" }}
						>
							Let&apos;s create one
						</Link>
					</Typography>
				</Stack>
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
	);
}
