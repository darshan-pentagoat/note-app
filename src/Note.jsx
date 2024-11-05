import React, { useState } from "react";
import "./index.css";
import NoteCard from "./NoteCard";
import { useNote } from "./NoteContext";
import { useTheme } from "./ThemeContext";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalBox from "./ModalBox";

const Note = () => {
  const { notes, addNote, labels } = useNote();
  const { appStyle, mode, theme } = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentNoteId, setCurrentNoteId] = useState(null); // State to hold the current note ID
  const filteredNotes = notes.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedNotes = filteredNotes.sort((a, b) => b.pinned - a.pinned);

  return (
    <div className="noteapp_container" style={appStyle}>
      <div className="d-flex justify-content-between">
        <h3>
          <span style={{ color: "#e29a2d" }}>NOTE</span> App.
        </h3>
        <div>
          <select name="labels_dd" id="labels_dd">
            <option disabled selected>
              Select The Label
            </option>
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
                  setCurrentNoteId={setCurrentNoteId} // Pass function to set current note ID
                />
              ))}
            </>
          )}
        </div>
      </div>
      <ModalBox
        currentNoteId={currentNoteId}
        setCurrentNoteId={setCurrentNoteId}
      />
    </div>
  );
};

export default Note;
