import bcrypt from "bcrypt"
import userModel from "../models/user.model.js"
import { genrateToken } from "../utils/tokens.js"
import cloudinary from "../config/cloudinary.js";

const signup = async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const { name, email, password } = req.body




    if (!name || !email || !password) {
        return res.status(404).json({ success: false, msg: "all fields are rquired" })
    }
    try {

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ msg: "user with this email already exists", success: false })
        }

        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "auto",
            folder: "cube_collab",
        });
        const imageUrl = uploadResult.secure_url

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            avatar: imageUrl
        })

        await newUser.save()
        await genrateToken(newUser._id, res)

        return res.status(200).json({ success: true, msg: "Registerd successfuly" })



    } catch (error) {
        console.log("error in signup :" + error.message);
        return res.status(500).json({ success: false, msg: "error in signup", error: error.message })
    }
}


const login = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).json({ success: false, msg: "all fields are rquired" })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, msg: "user not found" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(404).json({ success: false, msg: "invalid password" })
        }
        await genrateToken(user._id, res)
        return res.status(200).json({ success: true, msg: "login successfuly" })
    } catch (error) {
        console.log("error in login :" + error.message);
        return res.status(500).json({ success: false, msg: "error in login", error: error.message })

    }
}

const logout = async (req, res) => {


    try {
        res.cookie("token", "", { maxAge: 0 })
        res.clearCookie("token")

        return res.status(200).json({ success: true, msg: "logout successfuly" })
    } catch (error) {
        console.log("error in logout :" + error.message);
        return res.status(500).json({ success: false, msg: "error in logout", error: error.message })
    }
}

const sendVerificationEmail = async (req, res) => {
    const { email } = req.body;
    try {
        console.log(email);


    } catch (error) {
        console.log("error in sendVerificationEmail :" + error.message);
        return res.status(500).json({ success: false, msg: "error in sendVerificationEmail", error: error.message })
    }
}


const verifyEmail = async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;
    try {
        console.log(email);
        console.log(id);


    } catch (error) {
        console.log("error in verifyEmail :" + error.message);
        return res.status(500).json({ success: false, msg: "error in verifyEmail", error: error.message })

    }

}



export { signup, login, logout, verifyEmail, sendVerificationEmail }