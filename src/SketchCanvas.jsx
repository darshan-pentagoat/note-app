import { faEraser, faPaintbrush } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const SketchCanvas = ({ isEditable }) => {
  const [isErasing, setIsErasing] = useState(false);
  const CanvaStyles = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: "0.25rem",
    cursor: isEditable ? "crosshair" : "not-allowed",
  };
  return (
    <div>
      <hr />
      <div className="canvas-container">
        <div
          className="canvas-controls"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>Draw in Below Canvas</span>
          <div>
            <button className="draw_btn" onClick={() => setIsErasing(false)}>
              <FontAwesomeIcon
                icon={faPaintbrush}
                size="sm"
                style={{ color: "#000000" }}
              />
            </button>
            <button className="draw_btn" onClick={() => setIsErasing(true)}>
              <FontAwesomeIcon
                icon={faEraser}
                size="sm"
                style={{ color: "#000000" }}
              />
            </button>
          </div>
        </div>
        <ReactSketchCanvas
          style={CanvaStyles}
          width="100%"
          height="100px"
          strokeWidth={isErasing ? 10 : 4}
          strokeColor={isErasing ? "white" : "black"}
          eraserWidth={isErasing ? 10 : 0}
          eraseMode={isErasing}
          allowOnlyPointerType={isEditable ? "all" : "none"}
        />
      </div>
    </div>
  );
};

export default SketchCanvas;
