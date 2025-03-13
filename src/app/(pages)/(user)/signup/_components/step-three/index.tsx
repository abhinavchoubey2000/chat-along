import { Check } from "@mui/icons-material";
import {
	Button,
	Stack,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
	Typography,
	CircularProgress,
} from "@mui/material";
import { useRef } from "react";

interface StepThreeProps {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
	data: { profilePicture: string; firstName: string; lastName: string };
	prevStep: () => void;
	isLoading: boolean;
}

const StepThree: React.FC<StepThreeProps> = ({
	handleChange,
	handleSubmit,
	prevStep,
	data,
	isLoading,
}) => {
	const imageRef = useRef<HTMLImageElement | null>(null);

	const addImageViaLink = () => {
		if (imageRef.current) {
			imageRef.current.src = data.profilePicture;
		}
	};
	return (
		<Stack alignItems={"center"} spacing={2} width={"100%"} py={5}>
			<Typography
				textAlign={"center"}
				sx={{ opacity: 0.7 }}
				letterSpacing={1.5}
			>
				Add a profile picture above your name to make your account stand out.
			</Typography>
			<img
				ref={imageRef}
				height={150}
				width={150}
				style={{ borderRadius: "50%" }}
				src="https://i.pinimg.com/originals/59/af/9c/59af9cd100daf9aa154cc753dd58316d.jpg"
			/>
			<Typography textAlign={"center"} letterSpacing={1.5}>
				{`${data.firstName} ${data.lastName}`}
			</Typography>
			<FormControl variant="outlined" fullWidth color="primary">
				<InputLabel htmlFor="outlined-adornment-add-comment">
					Image url
				</InputLabel>
				<OutlinedInput
					id="outlined-adornment-image-url"
					type={"text"}
					name="profilePicture"
					onChange={handleChange}
					endAdornment={
						<InputAdornment position="end">
							{data.profilePicture !== "" ? (
								<IconButton
									color="secondary"
									aria-label={"search"}
									edge="end"
									onClick={addImageViaLink}
								>
									<Check />
								</IconButton>
							) : null}
						</InputAdornment>
					}
					label="Image URL"
				/>
			</FormControl>
			<Stack direction={"row"} width={"100%"} spacing={2}>
				<Button variant="outlined" color="primary" onClick={prevStep} fullWidth>
					Previous
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					fullWidth
				>
					{data.profilePicture === "" ? (
						isLoading ? (
							<CircularProgress sx={{ color: "white" }} size={18} />
						) : (
							"Skip and finish"
						)
					) : isLoading ? (
						<CircularProgress sx={{ color: "white" }} size={18} />
					) : (
						"Finish"
					)}
				</Button>
			</Stack>
		</Stack>
	);
};

export { StepThree };
