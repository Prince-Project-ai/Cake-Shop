import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../Utils/ApiError.js";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    avatar: {
      type: String,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function (next) {
  if (this.authProvider === "google" || !this.isModified("password")) return next();
  if (!this.password) return next(new ApiError(400, "Password is required."));
  this.password = await bcrypt.hash(this.password, 10);
  next();
});



userSchema.methods.isPasswordCorrect = async function (password) {
  if (!this.password) throw new ApiError(400, "Password not set for this user");
  return bcrypt.compare(password, this.password);
};



userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    }, process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};


userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}


export const User = mongoose.model("user", userSchema);