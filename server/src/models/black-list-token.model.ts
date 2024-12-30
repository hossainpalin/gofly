import { Document, model, Schema } from "mongoose";

interface BlackListTokenSchema extends Document {
  _id: string;
  token: string;
  expireAt: Date;
}

const blackListTokenSchema: Schema<BlackListTokenSchema> = new Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 1 day
  }
});

export const BlackListToken = model<BlackListTokenSchema>(
  "BlackListToken",
  blackListTokenSchema
);
