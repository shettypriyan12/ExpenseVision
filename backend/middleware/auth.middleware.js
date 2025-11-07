import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "No token provided", success: false });
        }

        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token", success: false });
        }

        const user = await User.findByPk(decoded.id, {
            attributes: ["id", "name", "email"]  
        });

        if (!user) {
            return res.status(401).json({ message: "User not found", success: false });
        }

        req.user = user;
        return next();

    } catch (error) {
        console.error("Auth middleware error:", error.message);
        return res.status(500).json({ message: error.message, success: false });
    }
};
