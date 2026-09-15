import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("DB CONNECTED SUCCESSFULLY");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
    }
};

export default connectDB;