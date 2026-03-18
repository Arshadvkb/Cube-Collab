import express from "express"

import {signup,login} from "../controllers/auth.controller.js"
import { upload } from "../middleware/multer.js";

const authRouter =express.Router()

authRouter.post("/signup", upload.single("file"),signup);
authRouter.post("/login",login);

export default authRouter