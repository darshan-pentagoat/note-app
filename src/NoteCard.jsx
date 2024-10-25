import React, { useState } from "react";
import "./index.css";
import { useNote } from "./NoteContext";

const NoteCard = ({ note }) => {
  const { currentDate, currentTime, deleteNote, updateNote } = useNote();

  const [desc, setDesc] = useState(note.text);
  const [isEditing, setIsEditing] = useState(true);

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleTitleChange = (e) => {
    updateNote(note.id, { title: e.target.value });
  };

  const toggleEditMode = () => {
    if (isEditing) {
      updateNote(note.id, { text: desc });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="col-md-3 note_card">
      <input
        type="text"
        placeholder="Note Title"
        value={note.title}
        onChange={handleTitleChange}
        disabled={!isEditing}
      />

      <textarea
        rows={5}
        placeholder="Note Description"
        onChange={handleDescChange}
        value={desc}
        disabled={!isEditing}
      />

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <p className="mb-0">{currentDate}</p>
          <p className="mb-0">{currentTime}</p>
        </div>

        <div>
          <button className="btn btn-secondary me-1" onClick={toggleEditMode}>
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            className="btn btn-danger"
            onClick={() => deleteNote(note.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
