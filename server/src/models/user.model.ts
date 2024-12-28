import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Document, Model, model, Schema } from "mongoose";

interface UserSchema extends Document {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  socketId: string;
}

// Define an interface for the user model
interface UserSchemaMethods extends Model<UserSchema> {
  generateAuthToken(): string;
  generateHashPassword(password: string): Promise<string>;
  verifyHashPassword(password: string): Promise<boolean>;
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
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET as string);
  return token;
};

// Generate password hash
userSchema.statics.generateHashPassword = async function (password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare hash password
userSchema.methods.verifyHashPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Export User model
export const User = model<UserSchema, UserSchemaMethods>("User", userSchema);
