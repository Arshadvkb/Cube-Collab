import express from "express"
import authenticateuser from "../middleware/authenticate_user.js"
import addDocument from "../controllers/document.controller.js"

const documentRouter = express.Router()

/**
 * @swagger
 * tags:
 *   name: Document
 *   description: Document management API
 */

/**
 * @swagger
 * /api/document/add:
 *   post:
 *     summary: Add a new document
 *     tags: [Document]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the document
 *               content:
 *                 type: string
 *                 description: Content of the document
 *               isPublic:
 *                 type: boolean
 *                 description: Whether the document is public
 *     responses:
 *       200:
 *         description: new Doc added successfuly
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
documentRouter.post("/add", authenticateuser, addDocument)


export default documentRouter