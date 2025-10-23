import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema(
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
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"]

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

ImageSchema.index({ styleTag: 1 }, { unique: true });

export default mongoose.model('Image', ImageSchema);