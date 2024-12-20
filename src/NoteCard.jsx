import React, { useState } from "react";
import "./index.css";
import { useNote } from "./NoteContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import {
  faArrowUpRightFromSquare,
  faCheck,
  faPalette,
  faPenToSquare,
  faThumbtack,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import SketchCanvas from "./SketchCanvas";

const NoteCard = ({ note, setCurrentNoteId }) => {
  const {
    currentDate,
    currentTime,
    deleteNote,
    updateNote,
    togglePin,
    labels,
    updateLabel,
    deleteLabel,
    editLabel,
    addLabelToCard,
    deleteParticularLabel,
  } = useNote();

  const [editingLabelId, setEditingLabelId] = useState(null);
  const [editedLabelText, setEditedLabelText] = useState("");
  // const [currentNoteId, setCurrentNoteId] = useState(null);

  const [view, setView] = useState("");
  const toggleCanvasView = () => {
    setView((prevView) => (prevView === "canvass" ? "" : "canvass"));
  };

  // const handleEditClick = (label) => {
  //   setEditingLabelId(label.id);
  //   setEditedLabelText(label.text);
  // };

  // const handleSaveClick = (labelId) => {
  //   editLabel(note.id, labelId, editedLabelText);
  //   setEditingLabelId(null);
  //   setEditedLabelText("");
  // };

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
          {/* ==== canvas btn ==== */}{" "}
          <button className="canvas_btn" onClick={toggleCanvasView}>
            <FontAwesomeIcon
              icon={faPalette}
              size="sm"
              style={{ color: view === "canvass" ? "#e29a2d" : "#070707" }}
            />
          </button>
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
              {/* <li>
                <button
                  type="button"
                  className="btn modal_btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setCurrentNoteId(note.id)} // Set the current note ID
                >
                  + Add Label
                </button>
              </li> */}

              {labels.map((label) => (
                <ul key={label.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    {editingLabelId === label.id ? (
                      // <>
                      //   <input
                      //     type="text"
                      //     value={editedLabelText}
                      //     onChange={(e) => setEditedLabelText(e.target.value)}
                      //     placeholder="Edit label"
                      //   />
                      //   {/* <button onClick={() => handleSaveClick(label.id)}>
                      //     Save
                      //   </button> */}
                      //   <FontAwesomeIcon
                      //     icon={faCheck}
                      //     size="l"
                      //     style={{
                      //       color: "#23d100",
                      //       cursor: "pointer",
                      //       margin: "5px",
                      //     }}
                      //     onClick={() => handleSaveClick(label.id)}
                      //   />
                      // </>
                      <></>
                    ) : (
                      <>
                        <li>{label.text}</li>
                        <div>
                          <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                            size="sm"
                            style={{
                              color: "#e29a2d",
                              cursor: "pointer",
                              marginRight: "5px",
                            }}
                            onClick={() => addLabelToCard(note.id, label)}
                          />
                          {/* <FontAwesomeIcon
                            icon={faPenToSquare}
                            size="sm"
                            style={{
                              color: "#000000",
                              cursor: "pointer",
                              marginRight: "5px",
                            }}
                            onClick={() => handleEditClick(label)}
                          /> */}
                          <FontAwesomeIcon
                            icon={faTrash}
                            size="sm"
                            style={{ color: "#e40000", cursor: "pointer" }}
                            onClick={() =>
                              deleteParticularLabel(note.id, label.id)
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                </ul>
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

      {/* Showing label */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {note.labels.map((label) => (
          <span className="label_on_card" key={label.id}>
            {label.text}
          </span>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <p className="mb-0">{note.time}</p>
          <p className="mb-0">{note.date}</p>
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

      {view === "canvass" && <SketchCanvas isEditable={isEditing} />}
    </div>
  );
};

export default NoteCard;
