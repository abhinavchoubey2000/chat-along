import mongoose from "mongoose";

export const connectToDB = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://abhinavchoubey:hardy@personal.i7tpr.mongodb.net/chatalong?retryWrites=true&w=majority&appName=Personal"
		);
		console.log("Connected To Database!!!");
	} catch (error) {
		console.log("The error message says -> ", (error as Error).message);
	}
};
