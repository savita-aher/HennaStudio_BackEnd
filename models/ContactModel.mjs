import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true
    },
    customDesignImage: {
      type: String,
      default: null // Store image URL or filename here
    }
  },
  {
    timestamps: true
  }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;