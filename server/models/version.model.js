import mongoose from "mongoose";

const versionSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
      index: true,
    },

    content: {
      type: mongoose.Schema.Types.Mixed, // same as document
      required: true,
    },

    editedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const versionModel = mongoose.models.Version || mongoose.model("Version", versionSchema);

export default versionModel;