import express from "express"
import { addCollaborator } from "../controllers/collaborator.controller.js"
import authenticateuser from "../middleware/authenticate_user.js"

const collaboratorRoute=express.Router()

/**
 * @swagger
 * tags:
 *   name: Collaborator
 *   description: Collaborator management API
 */

/**
 * @swagger
 * /api/collaborator/add/{id}:
 *   post:
 *     summary: Add a collaborator to a document
 *     tags: [Collaborator]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Document ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the collaborator
 *                 example: user@gmail.com
 *               role:
 *                 type: string
 *                 description: Role of the collaborator (viewer/editor)
 *                 example: editor
 *     responses:
 *       200:
 *         description: New collaborator added successfully
 *       400:
 *         description: User not verified or already collaborator
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
collaboratorRoute.post("/add/:id",authenticateuser,addCollaborator)



export default collaboratorRoute