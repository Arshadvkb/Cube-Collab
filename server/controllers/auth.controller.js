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

        let imageUrl = "";
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "auto",
                folder: "cube_collab",
            });
            imageUrl = uploadResult.secure_url;
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            avatar: imageUrl
        })

        await newUser.save()
        const token = await genrateToken(newUser._id, res)

        return res.status(200).json({ success: true, msg: "Registerd successfuly", user: newUser, token })



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
        const token = await genrateToken(user._id, res)
        req.session.userID = user._id;
        return res.status(200).json({ success: true, msg: "login successfuly", user, token })
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

        const htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #333;">Welcome to Cube Collab!</h2>
                </div>
                <div style="padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                    <p style="font-size: 16px; color: #555;">Hello ${user?.name || 'User'},</p>
                    <p style="font-size: 16px; color: #555;">Please confirm your email address to complete your registration. Your One-Time Password (OTP) for verification is:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <span style="font-size: 32px; font-weight: bold; color: #4a90e2; letter-spacing: 5px; padding: 10px 20px; background-color: #e6f2ff; border-radius: 5px;">${otp}</span>
                    </div>
                    <p style="font-size: 14px; color: #888; text-align: center;">This OTP is valid for a limited time. Please do not share it with anyone.</p>
                </div>
                <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #aaa;">
                    <p>&copy; ${new Date().getFullYear()} Cube Collab. All rights reserved.</p>
                </div>
            </div>
        `;

        await sendMail(email, "Verification Email", `OTP for verification is : ${otp}`, htmlTemplate);
        user.emailverificationotp = otp;
        user.emailVerificationOtpExpires = Date.now() + 15 * 60 * 1000; // 15 mins validity
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
        if (user.emailVerificationOtpExpires < Date.now()) {
            return res.status(400).json({ success: false, msg: "otp expired" })
        }
        user.emailverificationotp = ""
        user.emailVerificationOtpExpires = null;
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
        user.resetpasswordotp = otp;
        user.resetPasswordOtpExpires = Date.now() + 15 * 60 * 1000; // 15 mins validity
        await user.save()

        const htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #333;">Cube Collab Password Reset</h2>
                </div>
                <div style="padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                    <p style="font-size: 16px; color: #555;">Hello ${user?.name || 'User'},</p>
                    <p style="font-size: 16px; color: #555;">We received a request to reset your password. Here is your One-Time Password (OTP):</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <span style="font-size: 32px; font-weight: bold; color: #e74c3c; letter-spacing: 5px; padding: 10px 20px; background-color: #fcebeb; border-radius: 5px;">${otp}</span>
                    </div>
                    <p style="font-size: 14px; color: #888; text-align: center;">If you didn't request a password reset, you can safely ignore this email.</p>
                </div>
                <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #aaa;">
                    <p>&copy; ${new Date().getFullYear()} Cube Collab. All rights reserved.</p>
                </div>
            </div>
        `;

        await sendMail(email, "Reset Password", `OTP for reseting password:${otp}`, htmlTemplate);
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
        if (user.resetPasswordOtpExpires < Date.now()) return res.status(400).json({ success: false, msg: "OTP expired" })

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRETE,
            { expiresIn: "10m" }
        );
        user.resetpasswordotp = null
        await user.save()
        return res.status(200).json({ success: true, msg: "otp verified successfuly", token })

    } catch (error) {
        console.log("error in send reset password otp :" + error.message);
        return res.status(500).json({ success: false, msg: "error in send reset password otp", error: error.message })
    }
}

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETE);

        const user = await userModel.findById(decoded.userId);

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetpasswordotp = null;
        user.resetPasswordOtpExpires = null;

        await user.save();

        return res.json({
            success: true,
            msg: "Password reset successful"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Invalid or expired token"
        });
    }
}


const checkAuth = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ msg: "Not authenticated" });

        const decoded = jwt.verify(token, process.env.JWT_SECRETE);

        const user = await userModel.findById(decoded.id).select("-password");

        if (!user) return res.status(404).json({ msg: "User not found" });

        return res.status(200).json({ user });

    } catch (error) {
        return res.status(401).json({ msg: "Invalid token" });
    }
}

export { signup, login, logout, verifyEmail, sendVerificationEmail, sendResetPasswordOtp, matchOtp, resetPassword, checkAuth }