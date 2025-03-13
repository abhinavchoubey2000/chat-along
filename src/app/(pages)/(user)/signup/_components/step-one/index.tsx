import {
	TextField,
	Button,
	Stack,
	Typography,
	CircularProgress,
} from "@mui/material";

interface StepOneProps {
	data: { firstName: string; lastName: string; email: string };
	isLoading: boolean;
	errorData: {
		firstNameError: string;
		lastNameError: string;
		emailError: string;
	};
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	checkBasicInfoAndMoveNext: () => void;
}

const StepOne: React.FC<StepOneProps> = ({
	data,
	handleChange,
	checkBasicInfoAndMoveNext,
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
				Let us know your name which is gonna be displayed on your profile.
			</Typography>
			<Stack>
				<TextField
					label="First Name"
					name="firstName"
					value={data.firstName}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<Typography variant="caption" color="error">
					{errorData.firstNameError}
				</Typography>
			</Stack>
			<Stack>
				<TextField
					label="Last Name"
					name="lastName"
					value={data.lastName}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<Typography variant="caption" color="error">
					{errorData.lastNameError}
				</Typography>
			</Stack>
			<Stack>
				<TextField
					label="Email"
					name="email"
					type="email"
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
				onClick={checkBasicInfoAndMoveNext}
				fullWidth
			>
				{isLoading ? (
					<CircularProgress sx={{ color: "white" }} size={18} />
				) : (
					"Next"
				)}
			</Button>
		</Stack>
	);
};

export { StepOne };
