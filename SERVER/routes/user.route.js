import express from "express";
import { getcurrentuser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/current", getcurrentuser);

export default userRouter;