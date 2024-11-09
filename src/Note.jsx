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

const Note = () => {
  const {
    notes,
    addNote,
    labels,
    addLabel,
    handleNewLabel,
    newLabels,
    storeNote,
    editLabel,
    deleteLabel,
  } = useNote();
  const { appStyle, mode, theme } = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [editingLabelId, setEditingLabelId] = useState(null); // Track the label being edited
  const [editedLabelText, setEditedLabelText] = useState(""); // Hold edited label text

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

  // Handle label text change while editing
  const handleLabelEdit = (id, text) => {
    setEditingLabelId(id);
    setEditedLabelText(text);
  };

  return (
    <div className="noteapp_container" style={appStyle}>
      {storeNote}
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

          {/* New Label Input and Button */}
          <input
            type="text"
            className="new_label_input"
            placeholder="Add New Label"
            value={newLabels}
            onChange={handleNewLabel}
          />
          <button
            className="add_label_btn"
            onClick={() => addLabel(currentNoteId)}
          >
            Add Label
          </button>
          {/* New Label Input and Button ends */}

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

      {/* Labels Section with Edit and Delete Buttons */}
      <div className="labels_section">
        <h4>Labels</h4>
        <ul>
          {labels.map((label) => (
            <li key={label.id} className="label_items">
              {editingLabelId == label.id ? (
                <>
                  <input
                    type="text"
                    value={editedLabelText}
                    onChange={(e) => setEditedLabelText(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      editLabel(label.id, editedLabelText);
                      setEditingLabelId(null);
                    }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{label.text}</span>
                  <button onClick={() => handleLabelEdit(label.id, label.text)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button onClick={() => deleteLabel(label.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
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
    </div>
  );
};

export default Note;
