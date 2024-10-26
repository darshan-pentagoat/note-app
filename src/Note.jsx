import React, { useState } from "react";
import "./index.css";
import NoteCard from "./NoteCard";
import { useNote } from "./NoteContext";
import { useTheme } from "./ThemeContext";

const Note = () => {
  const { notes, addNote } = useNote();
  const { appStyle, mode, theme } = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const filteredNotes = notes.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter((note) => note.pinned);
  const unpinnedNotes = filteredNotes.filter((note) => !note.pinned);

  return (
    <div className="noteapp_container" style={appStyle}>
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
          <button
            className="theme_btn"
            onClick={mode}
            style={{
              background: theme ? "black" : "white",
              color: theme ? "white" : "black",
            }}
          >
            {theme ? "Dark" : "Light"}
          </button>
        </div>
      </div>

      <div className="container_fluid card_container">
        <div className="row">
          {pinnedNotes.length > 0 && (
            <>
              <h4>Pinned Notes</h4>
              {pinnedNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </>
          )}

          {unpinnedNotes.length > 0 && (
            <>
              <h4>{pinnedNotes.length >= 1 ? "Other Notes" : ""}</h4>
              {unpinnedNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Note;
