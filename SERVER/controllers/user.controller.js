import User from "../models/user_models.js";
import jwt from "jsonwebtoken";

export const getcurrentuser = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(200).json(null);
        }

        const verifytoken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifytoken) {
            return res.status(200).json(null);
        }

        const user = await User.findById(verifytoken.userId);
        if (!user) {
            return res.status(200).json(null);
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(200).json(null);
    }
};