import React, { createContext, useContext, useState } from "react";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const currentDate = date + "/" + month + "/" + year;
  const currentTime = hours + ":" + minutes;

  const addNote = () => {
    const newNote = { id: Date.now(), text: "", title: "" };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const updateNote = (id, updatedData) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, ...updatedData } : note))
    );
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        updateNote,
        currentDate,
        currentTime,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => {
  return useContext(NoteContext);
};
