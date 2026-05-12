import express, { Router } from "express";
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNote,
} from "../controller/notesController.js";

const router = express.Router();

//GET BY ID
router.get("/:id", getNote)
// GET
router.get("/", getAllNotes);
// POST
router.post("/", createNote);
// PUT
router.put("/:id", updateNote);
// DELETE
router.delete("/:id", deleteNote);

export default router;
