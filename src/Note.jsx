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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const notify = () =>
    toast.success("Label Added Successfully", {
      position: "top-center",
      theme: "colored",
      autoClose: 1000,
    });

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

          {/* New Label Input and Button */}
          <span className="add_label_div">
            <input
              type="text"
              className="new_label_input"
              placeholder="Add New Label"
              value={newLabels}
              onChange={handleNewLabel}
            />
            <button
              className="add_label_btn"
              onClick={() => {
                addLabel(currentNoteId);
                notify();
              }}
            >
              {" "}
              Add Label
            </button>
          </span>

          {/* New Label Input and Button ends */}

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

      {/* Labels Section with Edit and Delete Buttons */}
      <div className="labels_section">
        <h4 style={{ textDecoration: "underline" }}>
          {labels.length === 0 ? "" : "All Labels:"}
        </h4>
        <ul>
          {labels.map((label) => (
            <li
              style={{ listStyle: "decimal" }}
              key={label.id}
              className="label_items"
            >
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
                    className="save_label_btn"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{label.text}</span>
                  <button
                    className="label_edit_btn"
                    onClick={() => handleLabelEdit(label.id, label.text)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="label_delete_btn"
                    onClick={() => deleteLabel(label.id)}
                  >
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
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Note;
