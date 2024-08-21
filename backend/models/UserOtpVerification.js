import mongoose from "mongoose";
const UserOtpVerificationSchema = mongoose.Schema({
  userId: { type: String },
  otp: { type: String },
  createdAt: { type: Date },
  expiersAt: { type: Date },
});

export const UserOtpVerification = mongoose.model(
  "UserOtpVerification",
  UserOtpVerificationSchema
);
