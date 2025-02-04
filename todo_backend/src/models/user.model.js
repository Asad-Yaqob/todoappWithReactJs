import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    userName: { type: String, required: true, lowercase: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateRefreshToken = function () {
     return jwt.sign(
       {
         _id: this._id,
       },
       process.env.REFRESH_TOKEN_SECRET
     );
}

userSchema.methods.generateAccessToken = function () {
     return jwt.sign(
       {
         _id: this._id,
         isAdmin: this.isAdmin,
       },
       process.env.ACCESS_TOKEN_SECRET
     );
}

export const User = model("User", userSchema);