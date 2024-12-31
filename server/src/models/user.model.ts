import bcrypt from "bcrypt";
import { Document, Model, model, Schema } from "mongoose";
import jwt from "jsonwebtoken";

interface UserSchema extends Document {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  socketId: string;
  verifyHashPassword(password: string): Promise<boolean>;
}

interface UserStaticMethods extends Model<UserSchema> {
  generateAuthToken(userId: string): string;
  generateHashPassword(password: string): Promise<string>;
}

const userSchema: Schema<UserSchema> = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false
    },
    socketId: {
      type: String
    }
  },
  { timestamps: true }
);

// Generate json web token
userSchema.statics.generateAuthToken = function (userId: string) {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "24h"
  });
};

// Compare hash password
userSchema.methods.verifyHashPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Generate password hash
userSchema.statics.generateHashPassword = async function (password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Export User model
export const User = model<UserSchema, UserStaticMethods>("User", userSchema);
