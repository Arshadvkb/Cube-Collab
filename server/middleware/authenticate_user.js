import { userModel } from "../models/user.model.js";


const authenticateuser = async (req, res, next) => {
    try {
        if (!req.ssession || !req.session.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await userModel.findById(req.session.userId);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default authenticateuser;