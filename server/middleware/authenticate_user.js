import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authenticateuser = async (req, res, next) => {
    try {
        let authUserId = null;

        // Check if session exists
        if (req.session && req.session.userID) {
            authUserId = req.session.userID;
        } 
        // Fallback to JWT Bearer token from headers
        else {
            const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
            if (token) {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRETE);
                    authUserId = decoded.id; // token was created with { id: user._id }
                } catch (err) {
                    console.log("JWT Verification Error: ", err);
                }
            }
        }

        if (!authUserId) {
            return res.status(401).json({ msg: "Unauthorized: No valid session or token found" });
        }

        const user = await userModel.findById(authUserId);
        if (!user) {
            return res.status(401).json({ msg: "Unauthorized: No user found with id" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in authenticateuser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default authenticateuser;