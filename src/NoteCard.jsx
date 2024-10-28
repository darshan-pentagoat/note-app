import React, { useState } from "react";
import "./index.css";
import { useNote } from "./NoteContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import ModalBox from "./ModalBox";

const NoteCard = ({ note }) => {
  const {
    currentDate,
    currentTime,
    deleteNote,
    updateNote,
    togglePin,
    labels,
  } = useNote();

  const [desc, setDesc] = useState(note.text);
  const [isEditing, setIsEditing] = useState(true);

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleTitleChange = (e) => {
    updateNote(note.id, { title: e.target.value });
  };

  // edit and save
  const toggleEditMode = () => {
    if (isEditing) {
      updateNote(note.id, { text: desc });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="col-md-3 note_card">
      <div className="d-flex justify-content-between align-items-center">
        <input
          type="text"
          placeholder="Note Title"
          value={note.title}
          onChange={handleTitleChange}
          disabled={!isEditing}
        />
        <div className="d-flex justify-content-between align-items-center">
          <button onClick={() => togglePin(note.id)} className="pin_btn">
            {note.pinned ? (
              <FontAwesomeIcon
                icon={faThumbtack}
                style={{ color: "#000000" }}
              />
            ) : (
              "Pin"
            )}
          </button>
          <div className="dropdown">
            <button
              className="dd_button dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                style={{ color: "#000000" }}
              />
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  type="button"
                  className="btn modal_btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  + Add Label
                </button>
              </li>
              {labels.map((label) => (
                <li key={label.id}>new label</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

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
          <button
            className={
              isEditing ? "btn me-1" : "btn btn-secondary me-1" // edit and save
            }
            style={{ background: isEditing ? "#e29a2d" : "#707070" }}
            onClick={toggleEditMode}
          >
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
      <ModalBox />
    </div>
  );
};

export default NoteCard;
