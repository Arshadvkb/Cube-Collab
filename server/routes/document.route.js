import express from "express"
import authenticateuser from "../middleware/authenticate_user.js"
import { addDocument, updateDoc, viewDoc } from "../controllers/document.controller.js"

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

/**
 * @swagger
 * /api/document/view:
 *   get:
 *     summary: View documents
 *     tags: [Document]
 *     responses:
 *       200:
 *         description: Document(s) retrieved successfully
 *       500:
 *         description: Internal server error
 */
documentRouter.get("/view", authenticateuser, viewDoc)

/**
 * @swagger
 * /api/document/update/{id}:
 *   put:
 *     summary: Update a document
 *     tags: [Document]
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
 *             properties:
 *               title:
 *                 type: string
 *                 description: New title for the document
 *               content:
 *                 type: string
 *                 description: New content
 *               isPublic:
 *                 type: boolean
 *                 description: Visibility status
 *     responses:
 *       200:
 *         description: The Document edited successfuly
 *       400:
 *         description: Bad request (e.g. not owner or editor)
 *       500:
 *         description: Internal server error
 */
documentRouter.put("/update/:id", authenticateuser, updateDoc)


export default documentRouter