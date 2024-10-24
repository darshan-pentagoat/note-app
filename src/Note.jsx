import React, { useState } from "react";
import "./index.css";
import NoteCard from "./NoteCard";
import { useNote } from "./NoteContext";

const Note = () => {
  const { notes, addNote } = useNote();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="noteapp_container">
      <div className="d-flex justify-content-between">
        <h3>
          <span style={{ color: "#e29a2d" }}>NOTE</span> App.
        </h3>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="search_input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add_note_btn" onClick={addNote}>
            Add Note +
          </button>
        </div>
      </div>

      <div className="container_fluid card_container">
        <div className="row">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Note;
