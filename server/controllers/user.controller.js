import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"

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

const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {

        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, msg: "user not found" });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const salt = bcrypt.genSalt(10)
            const hashed = bcrypt.hash(password, salt)
            user.password = hashed

        };
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "auto",
                folder: "cube_collab",
            });
            user.avatar = uploadResult.secure_url;
        }
        await user.save();
        return res.status(200).json({ success: true, msg: "user profile updated successfully", user });

    } catch (error) {
        console.log("error in updateProfile :" + error.message);
        return res.status(500).json({ success: false, msg: "error in updateProfile", error: error.message });
    }
}

export { getProfile, updateProfile }
