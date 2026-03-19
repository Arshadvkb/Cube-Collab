import mongoose from "mongoose"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    emailverificationotp: {
      type: Number

    },
    resetpasswordotp: {
      type: Number
    }
  },
  { timestamps: true },
);

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel