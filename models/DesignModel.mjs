import mongoose from "mongoose";

const designSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "hand",
        "feet",
        "bridal",
        "kids",
        "minimalist",
        "festive",
        "maternity",
        "mandala"
      ],
      lowercase: true,
      trim: true
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true
    },
    isLocal: {
      type: Boolean,
      default: true
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0
    },
    styleTag: {
      type: String,
      required: [true, "Style tag is required"],
      unique: true,
      trim: true,
      lowercase: true
    }
  },
  {
    timestamps: true
  }
);

const Design = mongoose.model("Design", designSchema);
export default Design;