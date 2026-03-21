import collaborationModel from "../models/collaboration.model.js";
import documentModel from "../models/document.model.js";

const addDocument = async (req, res) => {
    try {
        const { title, content, isPublic } = req.body
        if (!req.user.isVerified) {
            return res.status(400).json({ success: false, msg: "User have not verified email" })
        }

        const newDoc = new documentModel({
            title,
            content,
            isPublic,
            owner: req.user._id,
            lastEditedBy: req.user._id

        })
        newDoc.save()
        console.log("New doc added");
        return res.status(200).json({ success: true, msg: "new Doc added successfuly" })

    } catch (error) {
        console.log("error in adding document :" + error.message);
        return res.status(500).json({ success: false, msg: "Internal server error", error: error.message })
    }
}

const viewDoc = async (req, res) => {
    try {
        const user = req.user._id
        const doc = await documentModel.find({ owner: user })
        console.log(doc);
        return res.status(200).json({ success: true, msg: "Available Documents", documents: doc })


    } catch (error) {
        console.log("error in viewing document :" + error.message);
        return res.status(500).json({ success: false, msg: "Internal server error", error: error.message })
    }
}

const updateDoc = async (req, res) => {

    const { id } = req.params
    const { title, content, isPublic } = req.body
    try {
        const doc = await documentModel.findById(id)

        const isOwner = doc.owner.toString() === req.user._id.toString();

        const collaboration = await collaborationModel.findOne({
            documentId: id,
            userId: req.user._id
        });

        const isEditor = collaboration && collaboration.role === "editor";


        if (!isOwner && !isEditor) {
            return res.status(403).json({
                success: false,
                msg: "Unauthorized: You are not the owner or an editor of this document"
            });
        }

        if (title) {
            doc.title = title
        }
        if (content) {
            doc.content = content
        }
        if (isPublic) {
            doc.isPublic = isPublic
        }
        doc.lastEditedBy = req.user._id

        await doc.save()
        return res.status(200).json({ success: true, msg: "The Document edited successfuly" })


    } catch (error) {
        console.log("error in updating document :" + error.message);
        return res.status(500).json({ success: false, msg: "Internal server error", error: error.message })
    }

}



export { addDocument, viewDoc, updateDoc }