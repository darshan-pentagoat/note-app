import React, { createContext, useContext, useState } from "react";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  // const handleChange = (e) => {
  //   setNotes(e.target.value);
  // };

  // const handleEditChange = (e) => {
  //   setNotes(e.target.value);
  // };

  // const toogle = (idx) => {
  //   if (isEditing === idx) {
  //     const updatedNote = [...notes];
  //     updatedNote[idx] = editNote;
  //     setNotes(updatedNote);
  //     setIsEditing(null);
  //   } else {
  //     setIsEditing(idx);
  //     setEditNote(notes[idx]);
  //   }
  // };

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  let hours = today.getHours() % 12 || 12;
  const minutes = today.getMinutes().toString().padStart(2, "0");
  const period = today.getHours() >= 12 ? "PM" : "AM";
  
  const currentDate = date + "/" + month + "/" + year;
  const currentTime = hours + ":" + minutes + " " + period;

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
