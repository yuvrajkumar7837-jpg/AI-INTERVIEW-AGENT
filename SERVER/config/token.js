import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const generateToken = async(userid) =>{

try {
    const token = jwt.sign({userId: userid}, process.env.JWT_SECRET , {expiresIn : "7d"})
    return token;
} catch (error) {
    console.log(error);
    throw new Error("Error generating token");
}

}

export default generateToken