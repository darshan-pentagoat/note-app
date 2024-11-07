import React, { createContext, useContext, useEffect, useState } from "react";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  // ========== FOR LOCAL STORAGE ==========
  // const [notes, setNotes] = useState(() => {
  //   const savedNotes = localStorage.getItem("notes");
  //   return savedNotes ? JSON.parse(savedNotes) : [];
  // });

  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(notes));
  // }, [notes]);
  // ========== LOCAL STORAGE END ==========

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
  const hours = today.getHours() % 12 || 12;
  const minutes = today.getMinutes().toString().padStart(2, "0");
  const period = today.getHours() >= 12 ? "PM" : "AM";

  // const [curTime, setCurTime] = useState("");

  // const curMin = () => {
  // }

  const currentDate = date + "/" + month + "/" + year;
  const currentTime = hours + ":" + minutes + " " + period;

  const addNote = () => {
    const newNote = { id: Date.now(), text: "", title: "", labels: [] }; // Each note has an array for labels
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

  // const togglePin = (id) => {
  //   setNotes(
  //     notes.map((note) => {}
  //     )
  //   );
  // };

  const togglePin = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  // labels
  // const addLabel = () => {
  //   const newLabel = { id: Date.now() };
  //   setLabels([...labels, newLabel]);
  // };

  const [labels, setLabels] = useState([]);
  // const addLabelToCard = (label) => {
  //   setLabels((cur) => [...cur, { ...label }]);
  // };
  const addLabelToCard = (noteId, label) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, labels: [...note.labels, label] } : note
      )
    );
  };

  const addLabel = (noteId) => {
    const newLabel = { id: Date.now(), text: newLabels };

    // Update the specific note's labels
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? { ...note, labels: [...note.labels, newLabel] }
          : note
      )
    );

    // Add the label to the global labels list only if it doesn't already exist
    setLabels((prevLabels) => {
      if (!prevLabels.some((label) => label.text === newLabels)) {
        return [...prevLabels, newLabel];
      }
      return prevLabels;
    });
    setNewLabels("");
  };

  const [newLabels, setNewLabels] = useState([]);
  const handleNewLabel = (e) => {
    setNewLabels(e.target.value);
  };
  // const [labelInput, setLabelInput] = useState([]);
  // const handleLabelInput = (e) => {
  //   setLabelInput(e.target.value);
  // };
  const updateLabel = (id, updatedData) => {
    setLabels((prevLabels) =>
      prevLabels.map((label) =>
        label.id === id ? { ...label, ...updatedData } : label
      )
    );
  };
  // const deleteLabel = (id) => {
  //   setLabels((prevLabels) => prevLabels.filter((label) => label.id !== id));
  // };
  const editLabel = (noteId, labelId, newLabelText) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              labels: note.labels.map((label) =>
                label.id === labelId ? { ...label, text: newLabelText } : label
              ),
            }
          : note
      )
    );
    setLabels((prevLabels) =>
      prevLabels.map((label) =>
        label.id === labelId ? { ...label, text: newLabelText } : label
      )
    );
  };

  // const deleteLabel = (noteId, labelId) => {
  //   setNotes((prevNotes) =>
  //     prevNotes.map((note) =>
  //       note.id === noteId
  //         ? {
  //             ...note,
  //             labels: note.labels.filter((label) => label.id !== labelId),
  //           }
  //         : note
  //     )
  //   );

  //   setLabels((prevLabels) =>
  //     prevLabels.filter((label) => label.id !== labelId)
  //   );
  // };

  // Delete label for a specific note
  const deleteLabel = (noteId, labelId) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              labels: note.labels.filter((label) => label.id !== labelId),
            }
          : note
      )
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
        togglePin,
        labels,
        addLabel,
        // labelInput,
        // handleLabelInput,
        newLabels,
        handleNewLabel,
        updateLabel,
        deleteLabel,
        editLabel,
        addLabelToCard,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => {
  return useContext(NoteContext);
};
