import { Document, Model, model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface CaptainSchema extends Document {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  status: string;
  socketId: string;
  vehicle: {
    type: string;
    color: string;
    numberPlate: string;
    capacity: number;
  };
  location: {
    lat: number;
    lon: number;
  };
  verifyHashPassword(password: string): Promise<boolean>;
}

interface CaptainStaticMethods extends Model<CaptainSchema> {
  generateAuthToken(captainId: string): string;
  generateHashPassword(password: string): Promise<string>;
}

const captainSchema: Schema<CaptainSchema> = new Schema(
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
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive"
    },
    socketId: {
      type: String,
      default: null
    },
    vehicle: {
      type: {
        type: String,
        required: [true, "Type is required"],
        enum: ["car", "auto", "motorcycle"]
      },
      color: {
        type: String,
        required: [true, "Color is required"],
        minLength: [3, "Color must be at least 3 characters long"],
        trim: true
      },
      numberPlate: {
        type: String,
        required: [true, "Number plate is required"],
        minLength: [3, "Number plate must be at least 3 characters long"],
        trim: true
      },
      capacity: {
        type: Number,
        required: [true, "Capacity is required"],
        min: [1, "Capacity must be at least 1"]
      }
    },
    location: {
      lat: {
        type: Number,
        default: 0
      },
      lon: {
        type: Number,
        default: 0
      }
    }
  },
  { timestamps: true }
);

// Generate json web token
captainSchema.statics.generateAuthToken = function (captainId: string) {
  return jwt.sign({ _id: captainId }, process.env.JWT_SECRET as string, {
    expiresIn: "24h"
  });
};

// Compare hash password
captainSchema.methods.verifyHashPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Generate password hash
captainSchema.statics.generateHashPassword = async function (password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const Captain = model<CaptainSchema, CaptainStaticMethods>(
  "Captain",
  captainSchema
);
