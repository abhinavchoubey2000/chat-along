import { AddAPhoto } from "@mui/icons-material";
import {
	Button,
	Stack,
	IconButton,
	Typography,
	CircularProgress,
} from "@mui/material";
import { useRef } from "react";

interface StepThreeProps {
	handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
	data: { profilePicture: null | File; firstName: string; lastName: string };
	prevStep: () => void;
	isLoading: boolean;
}

const StepThree: React.FC<StepThreeProps> = ({
	handleFileChange,
	handleSubmit,
	prevStep,
	data,
	isLoading,
}) => {
	const inputFileRef = useRef<HTMLInputElement>(null);

	return (
		<Stack alignItems={"center"} spacing={2} width={"100%"} py={5}>
			<Typography
				textAlign={"center"}
				sx={{ opacity: 0.7 }}
				letterSpacing={1.5}
			>
				Add a profile picture above your name to make your account stand out.
			</Typography>
			<Stack direction={"row"} spacing={2} alignItems={"center"}>
				<Stack>
					<img
						height={150}
						width={150}
						style={{ borderRadius: "50%" }}
						src={
							data.profilePicture
								? URL.createObjectURL(data.profilePicture)
								: "https://i.pinimg.com/originals/59/af/9c/59af9cd100daf9aa154cc753dd58316d.jpg"
						}
						alt="Profile Picture"
					/>
					<Typography textAlign={"center"} letterSpacing={1.5}>
						{`${data.firstName} ${data.lastName}`}
					</Typography>
				</Stack>

				<input
					type="file"
					name="profilePicture"
					ref={inputFileRef}
					style={{ display: "none" }}
					onChange={handleFileChange}
					accept="image/*"
				/>
				<IconButton
					onClick={() => {
						inputFileRef.current?.click();
					}}
					sx={{ height: 80, width: 80 }}
				>
					<AddAPhoto sx={{ height: 50, width: 50 }} />
				</IconButton>
			</Stack>
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
					{isLoading ? (
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
