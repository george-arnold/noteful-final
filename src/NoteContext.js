import React from 'react'

const NoteContext = React.createContext({
  notes: [],
  folders: [],
  addNewFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})

export default NoteContext