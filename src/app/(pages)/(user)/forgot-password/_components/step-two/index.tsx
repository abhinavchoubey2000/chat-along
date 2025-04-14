import {
	TextField,
	Button,
	Stack,
	Typography,
	CircularProgress,
} from "@mui/material";
import React from "react";

interface StepTwoProps {
	data: { password: string };
	isLoading?: boolean;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	checkPassword: () => void;
	prevStep: () => void;
	errorData: {
		passwordError?: string;
	};
}

const StepTwo: React.FC<StepTwoProps> = ({
	data,
	handleChange,
	checkPassword,
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
				Create your new password and click on update password.
			</Typography>
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

			<Stack direction={"row"} spacing={2} sx={{ my: 2 }}>
				<Button variant="outlined" color="primary" onClick={prevStep} fullWidth>
					Previous
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={checkPassword}
					disabled={isLoading}
					fullWidth
					sx={{ alignItems: "center", gap: 1 }}
				>
					{isLoading ? (
						<CircularProgress sx={{ color: "white" }} size={18} />
					) : (
						"Update password"
					)}
				</Button>
			</Stack>
		</Stack>
	);
};

export { StepTwo };
