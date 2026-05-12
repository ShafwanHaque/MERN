import Note from "../models/Note.js";

export async function getNote(request, response) {
  try {
    const { id } = request.params;

    const note = await Note.findById(id);

    if (!note) {
      return response.status(404).json({ message: "Note not found" });
    }

    response.status(200).json(note);
  } catch (error) {
    console.error("Error in getting note.", error);
    response.status(500).json({ message: "Internal server error." });
  }
}

export async function getAllNotes(_, response) { // convension(use '_' instead of request)
  try {
    const getAllNote = await Note.find().sort({"createdAt": -1}); // for mewext by default value: 1
    response.status(200).json(getAllNote);
  } catch (error) {
    console.error("Error in getting notes. ", error);
    response.status(500).json({ message: "Internal server error." });
  }
}

export async function createNote(request, response) {
  try {
    const { title, content } = request.body;
    const newNote = new Note({ title, content });

    const saveNote = await newNote.save();
    response.status(201).send(saveNote);
  } catch (error) {
    console.error("Error in creating notes. ", error);
    response.status(500).json({ message: "Internal server error." });
  }
}

export async function updateNote(request, response) {
  try {
    const {title, content} = request.body;
    const id =  request.params.id;

    const updateNote = await Note.findByIdAndUpdate(id, {title, content}, {new: true})
    response.status(200).send(updateNote);
  } catch (error) {
    console.error("Error in updating notes. ", error);
    response.status(500).json({ message: "Internal server error." });
  }
}

export async function deleteNote(request, response) {
  response.status(200).send("Your note deleted successfully!");
}
