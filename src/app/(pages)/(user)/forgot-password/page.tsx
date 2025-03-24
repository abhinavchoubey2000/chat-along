"use client";
import { useState } from "react";
import { Typography, Stack, Box } from "@mui/material";
import Logo from "../../../../../public/logo.png";
import { SignupStepper, StepOne, StepTwo } from "./_components";
import Image from "next/image";
import {
	useForgotPasswordMutation,
} from "@/redux/api-slices";
import toast from "react-hot-toast";

const Signup = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [forgotPassword, { isLoading: stepTwoLoading }] =
		useForgotPasswordMutation();
	const [errorText, setErrorText] = useState<{
		usernameError?: string;
		emailError?: string;
		passwordError?: string;
	}>({
		usernameError: "",
		emailError: "",
		passwordError: "",
	});
	const [formData, setFormData] = useState<{
		username: string;
		email: string;
		password: string;
	}>({
		username: "",
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const checkEmailAndUsernameAndMoveNext = async () => {
		if (formData.username === "") {
			setErrorText({
				...errorText,
				usernameError: "Username name must be filled",
				passwordError: "",
				emailError: "",
			});
		} else if (!formData.username.match(/\d/)) {
			setErrorText({
				...errorText,
				usernameError:
					"Username must contain combinations of [a-z], [0-9] and ['-','.', '_' or '@']",
				emailError: "",
				passwordError: "",
			});
		} else if (!formData.username.match(/[a-z]/)) {
			setErrorText({
				...errorText,
				usernameError:
					"Username must contain combinations of [a-z], [0-9] and ['-','.', '_' or '@']",
				passwordError: "",
				emailError: "",
			});
		} else if (!formData.username.match(/[^a-zA-Z0-9]/)) {
			setErrorText({
				...errorText,
				usernameError:
					"Username must contain combinations of [a-z], [0-9] and ['-','.', '_' or '@']",
				passwordError: "",
				emailError: "",
			});
		} else if (formData.email === "") {
			setErrorText({
				...errorText,
				emailError: "Your email is required",
				passwordError: "",
				usernameError: "",
			});
		} else if (!formData.email.includes("@")) {
			setErrorText({
				...errorText,
				emailError: "Your must write a correct format email",
				passwordError: "",
				usernameError: "",
			});
		} else {
			setErrorText({
				...errorText,
				emailError: "",
				passwordError: "",
				usernameError: "",
			});
			nextStep();
		}
	};

	const checkPassword = async () => {
		if (formData.password === "") {
			setErrorText({
				...errorText,
				passwordError: "You need to create a password to secure your account",
				usernameError: "",
				emailError: "",
			});
		} else if (formData.password !== "") {
			const response = await forgotPassword({
				username: formData.username,
				password: formData.password,
				email: formData.email,
			});

			if (!response.data.success) {
				return toast.error(response.data.message);
			}
			toast.success(response.data.message);
			window.location.href = "/login";
		}
	};

	const nextStep = () => setActiveStep((prev) => prev + 1);
	const prevStep = () => setActiveStep((prev) => prev - 1);

	return (
		<Box px={[2, 0]}>
			<Stack py={1}>
				<Image src={Logo} alt="Logo" height={40} width={60} />
				<Typography variant="h5" fontWeight={"bold"}>
					SIGN UP
				</Typography>
			</Stack>
			<SignupStepper activeStep={activeStep} />

			{activeStep === 0 && (
				<StepOne
					data={formData}
					errorData={errorText}
					handleChange={handleChange}
					checkEmailAndUsernameAndMoveNext={checkEmailAndUsernameAndMoveNext}
				/>
			)}
			{activeStep === 1 && (
				<StepTwo
					data={formData}
					errorData={errorText}
					handleChange={handleChange}
					checkPassword={checkPassword}
					prevStep={prevStep}
					isLoading={stepTwoLoading}
				/>
			)}
		</Box>
	);
};

export default Signup;
