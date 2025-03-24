"use client";

import { useState } from "react";
import {
	Switch,
	Typography,
	Button,
	Box,
	IconButton,
	Stack,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";
import { useLogoutMutation } from "@/redux/api-slices";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "@/redux/store";
import { changeDarkModeInState } from "@/redux/slices/user";

const SettingItem = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	padding: [theme.spacing(1), theme.spacing(2)],
	borderRadius: theme.shape.borderRadius,
	transition: "background 0.3s ease",
	cursor: "pointer",
	"&:hover": {
		backgroundColor: theme.palette.action.hover,
	},
}));

export default function Settings() {
	const [popupNotifications, setPopupNotifications] = useState(true);
	const [sound, setSound] = useState(false);
	const { darkMode } = useSelector((state: RootState) => state.User);
	const dispatch = useDispatch();
	const [isDialogOpened, setIsDialogOpened] = useState(false);
	const [logout, { isLoading }] = useLogoutMutation();

	const handleDarkMode = () => {
		dispatch(changeDarkModeInState());
	};
	const openDialog = () => {
		setIsDialogOpened(true);
	};
	const closeDialog = () => {
		setIsDialogOpened(false);
	};

	const handleDeleteAccount = () => {};
	const handleLogout = async () => {
		await logout();
		toast.success("Logged out successfully.");

		window.location.href = "/";
	};

	return (
		<>
			<Stack
				paddingY={1}
				paddingX={1}
				direction={"row"}
				alignItems={"center"}
				gap={2}
				width={"100%"}
			>
				<Link href={"/profile"}>
					<IconButton area-label={"Open Notifications"} size="large">
						<ArrowBack sx={{ fontSize: "1.5rem" }} />
					</IconButton>
				</Link>
				<Typography>Settings</Typography>
			</Stack>
			<SettingItem>
				<Typography sx={{ fontSize: ["0.8rem", "1rem"] }}>Dark Mode</Typography>
				<Switch
					sx={{ fontSize: ["0.8rem", "1rem"] }}
					checked={darkMode}
					onChange={handleDarkMode}
				/>
			</SettingItem>

			<SettingItem>
				<Typography sx={{ fontSize: ["0.8rem", "1rem"] }}>
					Pop-up Notifications
				</Typography>
				<Switch
					checked={popupNotifications}
					onChange={() => setPopupNotifications(!popupNotifications)}
				/>
			</SettingItem>

			<SettingItem>
				<Typography sx={{ fontSize: ["0.8rem", "1rem"] }}>Sound</Typography>
				<Switch checked={sound} onChange={() => setSound(!sound)} />
			</SettingItem>

			<SettingItem color={"error.main"} onClick={openDialog}>
				<Typography sx={{ fontSize: ["0.8rem", "1rem"] }}>
					Delete account
				</Typography>
			</SettingItem>

			<Box mt={3} display="flex" flexDirection="column" gap={2}>
				<Button
					variant="text"
					color="error"
					fullWidth
					onClick={handleLogout}
					sx={{ fontSize: ["0.8rem", "1rem"] }}
				>
					{isLoading ? (
						<CircularProgress sx={{ color: "white" }} size={18} />
					) : (
						"Log Out"
					)}
				</Button>
				<Dialog
					open={isDialogOpened}
					onClose={closeDialog}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Delete Account"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you sure you want to delete your account? After clicking YES,
							all your data will be erased and this action cannot be undoed.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={closeDialog}>No</Button>
						<Button onClick={handleDeleteAccount} color="error" autoFocus>
							Yes
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</>
	);
}
