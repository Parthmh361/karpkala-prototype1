import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: "string", required: true, unique: true },
    name: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    role: { type: "string", enum: ["admin", "user"], default: "user" },
    crop: { type: "string", required: true },
    occupation: { type: "string"},
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
