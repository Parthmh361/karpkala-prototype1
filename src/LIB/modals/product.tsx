import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productImage: { type: String },
    productCategory: { type: String, required: true },
    productQuantity: { type: Number, required: true },
    productRating: { type: Number },
    // productReviews: [{type: Schema.Types.ObjectId, ref: "Review"}],
  },
  {
    timestamps: true,
  }
);

// Use existing model or create a new one
const Product = models.Product || model("Product", ProductSchema);
export default Product;
