import {
	TextField,
	Button,
	Stack,
	Typography,
	CircularProgress,
} from "@mui/material";
import React from "react";

interface StepTwoProps {
	data: { username: string; password: string; phone: string };
	isLoading: boolean;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	checkCredentialsAndMoveNext: () => void;
	prevStep: () => void;
	errorData: {
		usernameError: string | React.ReactNode;
		passwordError: string;
		phoneError: string;
	};
}

const StepTwo: React.FC<StepTwoProps> = ({
	data,
	handleChange,
	checkCredentialsAndMoveNext,
	prevStep,
	errorData,
	isLoading,
}) => {
	return (
		<Stack py={5}>
			<Typography
				textAlign={"center"}
				sx={{ opacity: 0.7 }}
				letterSpacing={1.5}
			>
				Make us remember you and secure your account.
			</Typography>
			<Stack>
				<TextField
					label="Username"
					name="username"
					value={data.username}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<Typography variant="caption" color="error">
					{errorData.usernameError}
				</Typography>
			</Stack>

			<Stack>
				<TextField
					label="Password"
					name="password"
					type="password"
					value={data.password}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<Typography variant="caption" color="error">
					{errorData.passwordError}
				</Typography>
			</Stack>

			<Stack>
				<TextField
					label="Phone Number"
					name="phone"
					type="tel"
					value={data.phone}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<Typography variant="caption" color="error">
					{errorData.phoneError}
				</Typography>
			</Stack>

			<Stack direction={"row"} spacing={2} sx={{ my: 2 }}>
				<Button variant="outlined" color="primary" onClick={prevStep} fullWidth>
					Previous
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={checkCredentialsAndMoveNext}
					fullWidth
					sx={{ alignItems: "center", gap: 1 }}
				>
					{isLoading ? (
						<CircularProgress sx={{ color: "white" }} size={18} />
					) : (
						"Next"
					)}
				</Button>
			</Stack>
		</Stack>
	);
};

export { StepTwo };
