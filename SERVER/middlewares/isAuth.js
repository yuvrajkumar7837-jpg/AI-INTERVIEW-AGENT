import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        
        const verifytoken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifytoken) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        req.userId = verifytoken.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication error' });
    }
};

export default isAuth;