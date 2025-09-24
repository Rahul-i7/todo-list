import { MongoAPIError } from "mongodb";
import mongoose, { mongo } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if(!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

let isConnected = false;

async function dbConnect() {
    if (isConnected) return;

    try {
        await mongoose.connect(MONGODB_URI);
        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection error: ", error);
    }
};

export default dbConnect;