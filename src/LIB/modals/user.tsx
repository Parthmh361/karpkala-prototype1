import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: "string", required: true, unique: true },
    username: { type: "string", required: true, unique: true },
    name: { type: "string", required: true },
    // password: { type: "string", required: true },
    role: { type: "string", enum: ["admin", "user"], default: "user" },
    typeOfCotton: { type: "string" },
    occupation: { type: "string" },
    yearsInFarming: { type: "number" },
    address: { type: "string", required: true },
    cottonToBuy: { type: "string" },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
