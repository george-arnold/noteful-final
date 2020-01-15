import React from "react";

const NoteContext = React.createContext({
  notes: [],
  folders: [],
  addNewFolder: () => {},
  addNewNote: () => {},
  deleteNote: () => {}
});

export default NoteContext;
