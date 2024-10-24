import React from "react";
import "./index.css";
import { useNote } from "./NoteContext";

const NoteCard = ({ note }) => {
  const { currentDate, currentTime, deleteNote, updateNote } = useNote();

  const handleTitleChange = (e) => {
    updateNote(note.id, { title: e.target.value });
  };

  return (
    <div className="col-md-3 note_card">
      <input
        type="text"
        placeholder="Note Title"
        value={note.title}
        onChange={handleTitleChange}
      />
      <textarea rows={5} placeholder="Note Description" />
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <p className="mb-0">{currentDate}</p>
          <p className="mb-0">{currentTime}</p>
        </div>
        <button className="btn btn-danger" onClick={() => deleteNote(note.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
