import express from "express";
import { getProfile, updateProfile } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.js";

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User API
 */

/**
 * @swagger
 * /api/user/profile/{id}:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile
 *       404:
 *         description: User not found
 */
userRouter.get("/profile/:id", getProfile);

/**
 * @swagger
 * /api/user/update-profile/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       404:
 *         description: User not found
 */
userRouter.put("/update-profile/:id", upload.single("avatar"), updateProfile);

export default userRouter;  