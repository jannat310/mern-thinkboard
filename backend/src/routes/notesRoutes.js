import express from "express";
import { getAllNotes } from "../controllers/notesControllers.js";
import { createNote } from "../controllers/notesControllers.js";
import { updateNotes } from "../controllers/notesControllers.js";
import { deleteNote } from "../controllers/notesControllers.js";
import { getNoteById } from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNote);

export default router;

// app.get('/api/notes', (req, res) => {
//     res.status(200).send("You got 5 notes");
// })

// app.post('/api/notes/', (req, res) => {
//     res.status(201).json({message: "Note created successfully"});
// })

// app.put('/api/notes/:id', (req, res) => {
//     res.status(200).json({message: "Note updated successfully"});
// })

// app.delete('/api/notes/:id', (req, res) => {
//     res.status(200).json({message: "Note deleted successfully"});
// })
