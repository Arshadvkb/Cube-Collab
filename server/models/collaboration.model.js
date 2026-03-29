import mongoose from 'mongoose';

const collaborationSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    role: {
      type: String,
      enum: ['viewer', 'editor'],
      default: 'editor',
    },

    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const collaborationModel =
  mongoose.models.Collaboration ||
  mongoose.model('Collaboration', collaborationSchema);

export default collaborationModel;
