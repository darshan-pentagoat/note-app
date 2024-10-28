import React from "react";
import { useNote } from "./NoteContext";

const ModalBox = () => {
  const { addLabel, labelInput, handleLabelInput } = useNote();

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
              Modal title
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
              placeholder="Add New Label"
              value={labelInput}
              onChange={handleLabelInput}
              style={{ border: "1px solid #000", padding: "3px 10px" }}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={addLabel}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBox;
