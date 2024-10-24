import React from "react";
import Note from "./Note";
import { NoteProvider } from "./NoteContext";
import { ThemeProvider } from "./ThemeContext";

const App = () => {
  return (
    <div>
      <ThemeProvider>
        <NoteProvider>
          <Note />
        </NoteProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
