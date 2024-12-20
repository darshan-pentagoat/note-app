import React, { useState } from "react";
import { useNote } from "./NoteContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalBox = ({ currentNoteId }) => {
  const { addLabel, newLabels, handleNewLabel } = useNote();

  const handleAddLabel = () => {
    if (currentNoteId && newLabels.trim()) {
      addLabel(currentNoteId); // Use the note ID from props
      notify();
    }
  };

  const notify = () => 
    toast.success("Label Added Successfully", {
      position: "top-right",
      theme: "colored",
      autoClose: 1000,
    });

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Labels
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="modal_input"
              placeholder="Add New Label"
              value={newLabels}
              onChange={handleNewLabel}
              style={{ border: "1px solid #000", padding: "3px 10px" }}
            />
          </div>
          <div className="modal-footer">
            {/* <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button> */}

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddLabel}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalBox;
