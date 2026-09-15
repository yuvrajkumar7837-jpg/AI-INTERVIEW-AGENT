import 'dotenv/config';
import express from "express";
import connectDB from "./config/connectdb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";   

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
    connectDB();
});