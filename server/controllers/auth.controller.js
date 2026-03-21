import bcrypt from "bcrypt"
import userModel from "../models/user.model.js"
import { genrateToken } from "../utils/tokens.js"
import cloudinary from "../config/cloudinary.js";
import sendMail from "../utils/sendMail.js";
import jwt from "jsonwebtoken"

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
        req.session.userID = user._id;
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
    const { id } = req.params
    try {
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(404).json({ success: false, msg: "user not found" })
        }
        const email = user.email
        const otp = Math.floor(100000 + Math.random() * 900000);
        await sendMail(email, "Verification Email", `OTP for verification is : ${otp}`);
        user.emailverificationotp = otp
        await user.save()
        return res.status(200).json({ success: true, msg: "Verification email sent successfully" })

    } catch (error) {
        console.log("error in sendVerificationEmail :" + error.message);
        return res.status(500).json({ success: false, msg: "error in sendVerificationEmail", error: error.message })
    }
}


const verifyEmail = async (req, res) => {
    const { otp, email } = req.body;

    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, msg: "user not found" })
        }
        if (user.emailverificationotp !== otp) {
            return res.status(404).json({ success: false, msg: "invalid otp" })
        }
        user.emailverificationotp = ""
        user.isVerified = true
        await user.save()
        return res.status(200).json({ success: true, msg: "email verified successfully" })


    } catch (error) {
        console.log("error in verifyEmail :" + error.message);
        return res.status(500).json({ success: false, msg: "error in verifyEmail", error: error.message })

    }

}

const sendResetPasswordOtp = async (req, res) => {
    const { email } = req.body
    try {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const user = await userModel.findOne({ email })
        if (!user) return res.status(404).json({ success: false, msg: "No user found with this email" })
        user.resetpasswordotp = otp
        await user.save()
        await sendMail(email, "Reset Password", `OTP for reseting password:${otp}`)
        return res.status(200).json({ success: true, msg: "Verification email sent successfully" })

    } catch (error) {
        console.log("error in send reset password otp :" + error.message);
        return res.status(500).json({ success: false, msg: "error in send reset password otp", error: error.message })
    }
}

const matchOtp = async (req, res) => {
    const { otp, email } = req.body

    try {
        const user = await userModel.findOne({ email })

        if (!user) return res.status(404).json({ success: false, msg: "No user found" })

        if (user.resetpasswordotp != otp) return res.status(400).json({ success: false, msg: "Invalid OTP" })

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRETE,
            { expiresIn: "10m" }
        );
        user.resetpasswordotp = null
        user.save()
        return res.status(200).json({ success: true, msg: "otp verified successfuly" })

    } catch (error) {
        console.log("error in send reset password otp :" + error.message);
        return res.status(500).json({ success: false, msg: "error in send reset password otp", error: error.message })
    }
}




export { signup, login, logout, verifyEmail, sendVerificationEmail, sendResetPasswordOtp, matchOtp }