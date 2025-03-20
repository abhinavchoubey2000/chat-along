"use client";
import { useState } from "react";
import { Typography, Stack, Box } from "@mui/material";
import Logo from "../../../../../public/logo.png";
import { SignupStepper, StepOne, StepTwo, StepThree } from "./_components";
import Image from "next/image";
import {
	useCheckEmailInDBMutation,
	useCheckUsernameInDBMutation,
	useSignupMutation,
} from "@/redux/api-slices";
import { useUploadImageToCloudinaryMutation } from "@/redux/api-slices/post";

const Signup = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [checkEmailInDB, { isLoading: stepOneLoading }] =
		useCheckEmailInDBMutation();
	const [uploadImageToCloudinary, { isLoading: cloudinaryLoading }] =
		useUploadImageToCloudinaryMutation();
	const [checkUsernameInDB, { isLoading: stepTwoLoading }] =
		useCheckUsernameInDBMutation();
	const [signup] = useSignupMutation();
	const [errorText, setErrorText] = useState<{
		firstNameError: string;
		lastNameError: string;
		usernameError: string | React.ReactNode;
		emailError: string;
		passwordError: string;
		phoneError: string;
		profilePictureError: string;
	}>({
		firstNameError: "",
		lastNameError: "",
		usernameError: "",
		emailError: "",
		passwordError: "",
		phoneError: "",
		profilePictureError: "",
	});
	const [formData, setFormData] = useState<{
		firstName: string;
		lastName: string;
		username: string;
		email: string;
		password: string;
		phone: string;
		profilePicture: null | File;
	}>({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
		phone: "",
		profilePicture: null,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFormData({
				...formData,
				profilePicture: e.target.files[0],
			});
		}
	};

	const checkBasicInfoAndMoveNext = async () => {
		if (formData.firstName === "") {
			setErrorText({
				...errorText,
				firstNameError: "First name must be filled",
				lastNameError: "",
				emailError: "",
			});
		} else if (formData.lastName === "") {
			setErrorText({
				...errorText,
				lastNameError: "Last name must be filled",
				firstNameError: "",
				emailError: "",
			});
		} else if (formData.email === "") {
			setErrorText({
				...errorText,
				emailError: "Your email is required",
				firstNameError: "",
				lastNameError: "",
			});
		} else if (!formData.email.includes("@")) {
			setErrorText({
				...errorText,
				emailError: "Your must write a correct format email",
				firstNameError: "",
				lastNameError: "",
			});
		} else if (
			formData.email !== "" &&
			formData.firstName !== "" &&
			formData.lastName !== ""
		) {
			const data = await checkEmailInDB(formData.email);
			if (!data.data.success) {
				setErrorText({
					...errorText,
					emailError: data.data.message,
					firstNameError: "",
					lastNameError: "",
				});
			} else {
				setErrorText({
					...errorText,
					emailError: "",
					firstNameError: "",
					lastNameError: "",
				});
				nextStep();
			}
		}
	};
	const checkCredentialsAndMoveNext = async () => {
		if (formData.username === "") {
			setErrorText({
				...errorText,
				usernameError: "Username must be filled",
				passwordError: "",
				phoneError: "",
			});
		} else if (!formData.username.match(/\d/)) {
			setErrorText({
				...errorText,
				usernameError:
					"Username must contain combinations of [a-z], [0-9] and ['-','.', '_' or '@']",
				passwordError: "",
				phoneError: "",
			});
		} else if (!formData.username.match(/[a-z]/)) {
			setErrorText({
				...errorText,
				usernameError:
					"Username must contain combinations of [a-z], [0-9] and ['-','.', '_' or '@']",
				passwordError: "",
				phoneError: "",
			});
		} else if (!formData.username.match(/[^a-zA-Z0-9]/)) {
			setErrorText({
				...errorText,
				usernameError:
					"Username must contain combinations of [a-z], [0-9] and ['-','.', '_' or '@']",
				passwordError: "",
				phoneError: "",
			});
		} else if (formData.password === "") {
			setErrorText({
				...errorText,
				passwordError: "You need to create a password to secure your account",
				usernameError: "",
				phoneError: "",
			});
		} else if (formData.phone === "") {
			setErrorText({
				...errorText,
				phoneError: "Phone number is required",
				usernameError: "",
				passwordError: "",
			});
		} else if (
			formData.username !== "" &&
			formData.password !== "" &&
			formData.phone !== ""
		) {
			const data = await checkUsernameInDB({
				firstName: formData.firstName,
				phone: formData.phone,
				username: formData.username,
			});
			if (!data.data.success) {
				setErrorText({
					...errorText,
					usernameError: (
						<>
							{data.data.message} <br />
							<span style={{ color: "green" }}>
								Suggested username - {data.data.data}
							</span>
						</>
					),
					passwordError: "",
					phoneError: "",
				});
			} else {
				setErrorText({
					...errorText,
					usernameError: "",
					passwordError: "",
					phoneError: "",
				});
				nextStep();
			}
		}
	};
	const handleSubmit = async () => {
		const imageFormData = new FormData();
		imageFormData.append("image", formData.profilePicture || "");
		const cloudinaryResponse = await uploadImageToCloudinary(imageFormData);

		await signup({
			name: `${formData.firstName} ${formData.lastName}`,
			phone: formData.phone,
			email: formData.email,
			image: {
				image_url: cloudinaryResponse.data.image_url,
				public_id: cloudinaryResponse.data.public_id,
			},
			username: formData.username,
			password: formData.password,
		});
		window.location.href = "/login";
	};

	const nextStep = () => setActiveStep((prev) => prev + 1);
	const prevStep = () => setActiveStep((prev) => prev - 1);

	return (
		<Box>
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
					checkBasicInfoAndMoveNext={checkBasicInfoAndMoveNext}
					isLoading={stepOneLoading}
				/>
			)}
			{activeStep === 1 && (
				<StepTwo
					data={formData}
					errorData={errorText}
					handleChange={handleChange}
					checkCredentialsAndMoveNext={checkCredentialsAndMoveNext}
					prevStep={prevStep}
					isLoading={stepTwoLoading}
				/>
			)}
			{activeStep === 2 && (
				<StepThree
					data={formData}
					handleFileChange={handleFileChange}
					handleSubmit={handleSubmit}
					prevStep={prevStep}
					isLoading={cloudinaryLoading}
				/>
			)}
		</Box>
	);
};

export default Signup;
