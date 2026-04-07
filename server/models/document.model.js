import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: mongoose.Schema.Types.Mixed,
      default: {
        ops: [{ insert: '\n' }],
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    isPublic: {
      type: Boolean,
      default: false,
    },
    lastEditedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const documentModel =
  mongoose.models.Document || mongoose.model('Document', documentSchema);

export default documentModel;
