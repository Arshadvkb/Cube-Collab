import express from "express";
import { getProfile } from "../controllers/user.controller.js";

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

export default userRouter;  