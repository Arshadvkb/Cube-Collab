import express from "express"

import {signup,login,logout } from "../controllers/auth.controller.js"
import { upload } from "../middleware/multer.js";

const authRouter =express.Router()

authRouter.post("/signup", upload.single("file"),signup);
authRouter.post("/login",login);
authRouter.post("/logout",logout);

export default authRouter