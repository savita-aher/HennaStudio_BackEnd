import Contact from "../models/ContactModel.mjs";
import '../middleware/errorHandler.mjs';

// POST /api/contact
export const createContact = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

// Get all contact entries (admin view)
export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

// Delete a contact by ID
export const deleteContact = async (req, res, next) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      const error = new Error("Contact not found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (err) {
    err.status = 500;
    next(err);
  }
};