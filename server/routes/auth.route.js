import express from "express"

import signup from "../controllers/auth.controller.js"
import { upload } from "../middleware/multer.js";

const authRouter =express.Router()

authRouter.post("/signup", upload.single("file"),signup);

export default authRouter