import React from "react";
import Note from "./Note";
import { NoteProvider } from "./NoteContext";

const App = () => {
  return (
    <div>
      <NoteProvider>
        <Note />
      </NoteProvider>
    </div>
  );
};

export default App;
