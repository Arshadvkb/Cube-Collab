import userModel from "../models/user.model.js";

const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, msg: "user not found" });
        }
        return res.status(200).json({ success: true, msg: "user profile", user });

    } catch (error) {
        console.log("error in getProfile :" + error.message);
        return res.status(500).json({ success: false, msg: "error in getProfile", error: error.message });
    }
}



export { getProfile }
