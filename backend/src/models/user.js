import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "username is required"] },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "password is required"] },
    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isAccountVerify: { type: Boolean, default: false },
    resetOtp: { type: String, default: "" },
    verifyResetExpireAt: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
