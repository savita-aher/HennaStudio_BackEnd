import express from "express";
import {
  createContact,
  getAllContacts,
  deleteContact
} from "../controllers/contactController.mjs";

const router = express.Router();

router.post("/", createContact);
router.get("/", getAllContacts);
router.delete("/:id", deleteContact);

export default router;