import userModel from "../models/user.model.js";


const authenticateuser = async (req, res, next) => {
    try {
        console.log("Session id: " + req.sessionID);
        console.log("user id: " + req.session?.userID);

        if (!req.session || !req.session.userID) {
            return res.status(401).json({ msg: "Unauthorized :No user in seesion" });
        }
        const user = await userModel.findById(req.session.userID);
        if (!user) {
            return res.status(401).json({ msg: "Unauthorized :No user found with id" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default authenticateuser;