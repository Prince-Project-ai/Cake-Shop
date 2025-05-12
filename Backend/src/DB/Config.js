import mongoose from "mongoose";


export const ConnectToDB = async () => {
    try {
        await mongoose.connect(`${process.env.DB_CONNECTION_STRING}`);
        console.log("MONGODB CONNECTION SUCCESSFULLY");
    } catch (error) {
        console.log("CONNECTION ERROR: ", error);
        process.exit(1);
    }
}