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
router.get('/test', (req, res) => {
  res.send('Contact route is working');
});


export default router;