import User from "../models/user_models.js";
import generateToken from "../config/token.js";
import { verifyFirebaseIdToken } from "../services/firebaseAuth.service.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;
    const { name, email } = await verifyFirebaseIdToken(idToken);

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email });
    }

    const token = await generateToken(user._id);
    res.cookie("token", token, cookieOptions);

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(401)
      .json({ message: error.message || "Google authentication failed" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Logout Error" });
  }
};
