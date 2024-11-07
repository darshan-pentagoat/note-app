import React, { useState } from "react";
import "./index.css";
import NoteCard from "./NoteCard";
import { useNote } from "./NoteContext";
import { useTheme } from "./ThemeContext";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalBox from "./ModalBox";
import { ReactSketchCanvas } from "react-sketch-canvas";

const Note = () => {
  const { notes, addNote, labels } = useNote();
  const { appStyle, mode, theme } = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [isErasing, setIsErasing] = useState(false); // State to manage drawing/erasing mode

  // label filter
  const [selectedLabel, setSelectedLabel] = useState("");

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
  const CanvaStyles = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: "0.25rem",
    cursor: "crosshair",
  };

  // Toggle between pen and eraser
  const toggleEraseMode = () => {
    setIsErasing((prev) => !prev);
  };

  return (
    <div className="noteapp_container" style={appStyle}>
      <div className="d-flex justify-content-between">
        <h3>
          <span style={{ color: "#e29a2d" }}>NOTE</span> App.
        </h3>
        <div>
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

      {/* Canvas with pen and erase buttons */}
      {/* <div className="canvas-container">
        <div className="canvas-controls">
          <button onClick={() => setIsErasing(false)}>Pen</button>
          <button onClick={() => setIsErasing(true)}>Erase</button>
        </div>
        <ReactSketchCanvas
          style={CanvaStyles}
          width="50%"
          height="300px"
          strokeWidth={isErasing ? 10 : 4} 
          strokeColor={isErasing ? "white" : "black"}
          eraserWidth={isErasing ? 10 : 0} 
          eraseMode={isErasing} 
        />
      </div> */}
    </div>
  );
};

export default Note;
