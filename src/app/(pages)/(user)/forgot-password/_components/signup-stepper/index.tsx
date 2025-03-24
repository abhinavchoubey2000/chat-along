import { Stepper, Step, StepLabel } from "@mui/material";

type Props = {
	activeStep: number;
};

const steps = ["Verification", "New Password"];

const SignupStepper: React.FC<Props> = ({ activeStep }) => {
	return (
		<Stepper activeStep={activeStep} alternativeLabel>
			{steps.map((label, index) => (
				<Step key={index}>
					<StepLabel>{label}</StepLabel>
				</Step>
			))}
		</Stepper>
	);
};

export { SignupStepper };
