import React, { useState } from "react";
import "./index.css";
import NoteCard from "./NoteCard";
import { useNote } from "./NoteContext";
import { useTheme } from "./ThemeContext";
import {
  faArrowUpRightFromSquare,
  faCheck,
  faMoon,
  faPenToSquare,
  faSun,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalBox from "./ModalBox";
import { ReactSketchCanvas } from "react-sketch-canvas";

const Note = () => {
  const { notes, addNote, labels, storeNote } = useNote();
  const { appStyle, mode, theme } = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentNoteId, setCurrentNoteId] = useState(null);

  // label filter
  const [selectedLabel, setSelectedLabel] = useState("");

  const [editingLabelId, setEditingLabelId] = useState(null);

  const filteredNotes = notes
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      selectedLabel === "All" || selectedLabel === ""
        ? true
        : item.labels.some((label) => label.text === selectedLabel)
    );

  const sortedNotes = filteredNotes.sort((a, b) => b.pinned - a.pinned);

  // Toggle between pen and eraser
  // const toggleEraseMode = () => {
  //   setIsErasing((prev) => !prev);
  // };

  return (
    <div className="noteapp_container" style={appStyle}>
      {storeNote}
      <div className="d-flex justify-content-between">
        <h3>
          <span style={{ color: "#e29a2d" }}>NOTE</span> App.
        </h3>
        <div>
          <div>
            <ul className="dropdown-menu">
              <li>
                <button
                  type="button"
                  className="btn modal_btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setCurrentNoteId(note.id)} // Set the current note ID
                >
                  + Add Label
                </button>
              </li>
            </ul>
          </div>
          <select
            name="labels_dd"
            id="labels_dd"
            onChange={(e) => setSelectedLabel(e.target.value)}
          >
            <option selected disabled>
              Search by Label
            </option>
            <option value="All">All</option>
            {labels.map((label) => (
              <option key={label.id} value={label.text}>
                {label.text}
              </option>
            ))}
          </select>

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

          <button
            className="theme_btn"
            onClick={mode}
            style={{
              background: theme ? "black" : "white",
              color: theme ? "white" : "black",
            }}
          >
            {theme ? (
              <FontAwesomeIcon
                icon={faMoon}
                size="lg"
                style={{ color: "#ffffff" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faSun}
                size="lg"
                style={{ color: "#e99700" }}
              />
            )}
          </button>
        </div>
      </div>
      <div className="container_fluid card_container">
        <div className="row">
          {sortedNotes.length > 0 && (
            <>
              {sortedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  setCurrentNoteId={setCurrentNoteId}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <ModalBox currentNoteId={currentNoteId} />
    </div>
  );
};

export default Note;
