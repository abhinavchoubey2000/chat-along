"use client";
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Box,
	Container,
	CircularProgress,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { UserCard } from "./_components";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { RootState } from "@/redux/store";

export default function SearchUsers() {
	const [searchText, setSearchText] = useState("");
	const { allUsersData, userData, loading } = useSelector(
		(state: RootState) => state.User
	);
	const [searchedResults, setSearchedResults] = useState<
		Array<UserResponseDataInterface>
	>([]);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	useEffect(() => {
		setSearchedResults(
			allUsersData.filter((user) => {
				return (
					user.username?.toLowerCase().includes(searchText.toLowerCase()) ||
					user.name?.toLowerCase().includes(searchText.toLowerCase())
				);
			})
		);
	}, [searchText]);

	return loading ? (
		<Container
			maxWidth={"sm"}
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "90vh",
			}}
		>
			<CircularProgress sx={{ color: "blue" }} size={100} />
		</Container>
	) : (
		<>
			<FormControl variant="outlined" fullWidth color="secondary">
				<InputLabel htmlFor="outlined-adornment-add-comment">Search</InputLabel>
				<OutlinedInput
					id="outlined-adornment-search"
					type={"text"}
					value={searchText}
					onChange={handleChange}
					sx={{ borderRadius: 0 }}
					endAdornment={
						<InputAdornment position="end">
							<IconButton aria-label={"search"} edge="end">
								<Search />
							</IconButton>
						</InputAdornment>
					}
					label="Search"
				/>
			</FormControl>

			<Box
				width={"100%"}
				height={"70vh"}
				overflow={"auto"}
				mt={1}
				sx={{ display: "flex", flexDirection: "column" }}
			>
				{searchedResults.map((user, index) => {
					return (
						<UserCard
							darkMode={userData.settings?.darkMode || false}
							key={index}
							name={user.name || ""}
							username={user.username || ""}
							image={user.image?.image_url || ""}
							followersArray={user.followers || []}
							loggedInUserId={userData._id || ""}
						/>
					);
				})}
			</Box>
		</>
	);
}
