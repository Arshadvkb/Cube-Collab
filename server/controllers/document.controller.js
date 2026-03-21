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
        return res.status(200).json({ success: true, msg: "Available Documents", documents: [doc] })


    } catch (error) {
        console.log("error in viewing document :" + error.message);
        return res.status(500).json({ success: false, msg: "Internal server error", error: error.message })
    }
}

export { addDocument, viewDoc }