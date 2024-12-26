import mongoose, { Schema, Document } from "mongoose";

// Define the Cart Item Schema
const CartItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Assuming you have a 'Product' model for products
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a 'User' model for users
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the Cart Item Model
const CartItem = mongoose.models.CartItem || mongoose.model("CartItem", CartItemSchema);

export default CartItem;
