import { TextField, Button, Stack, Typography } from "@mui/material";

interface StepOneProps {
	data: { username: string; email: string };
	errorData: {
		usernameError?: string;
		emailError?: string;
	};
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	checkEmailAndUsernameAndMoveNext: () => void;
}

const StepOne: React.FC<StepOneProps> = ({
	data,
	handleChange,
	checkEmailAndUsernameAndMoveNext,
	errorData,
}) => {
	return (
		<Stack py={5}>
			<Typography
				textAlign={"center"}
				sx={{ opacity: 0.7 }}
				letterSpacing={1.5}
			>
				Enter your registered username and email.
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
					label="Email"
					name="email"
					value={data.email}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<Typography variant="caption" color="error">
					{errorData.emailError}
				</Typography>
			</Stack>
			<Button
				sx={{ my: 2 }}
				variant="contained"
				color="primary"
				onClick={checkEmailAndUsernameAndMoveNext}
				fullWidth
			>
				Next
			</Button>
		</Stack>
	);
};

export { StepOne };
