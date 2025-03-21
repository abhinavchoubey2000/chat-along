import mongoose from "mongoose";

export const connectToDB = async () => {
	try {
		await mongoose.connect(String(process.env.DATABASE_URL), {
			serverSelectionTimeoutMS: 5000,
		});
		console.log("Connected To Database!!!");
	} catch (error) {
		console.log("The error message says -> ", (error as Error).message);
	}
};
