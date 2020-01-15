import React, { Component } from "react";
import { Link } from "react-router-dom";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import NoteContext from "../NoteContext";
import { getNotesForFolder } from "../notes-helpers";
import "./NoteListMain.css";
import ErrorBoundary from "../ErrorBoundary";

export default class NoteListMain extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };
  static contextType = NoteContext;

  render() {
    const { folderId } = this.props.match.params;
    const { notes = [] } = this.context;
    const notesForFolder = getNotesForFolder(notes, folderId);
    return (
      <section className="NoteListMain">
        <ErrorBoundary>
          <ul>
            {notesForFolder.map(note => (
              <li key={note.id}>
                <Note id={note.id} name={note.name} modified={note.modified} />
              </li>
            ))}
          </ul>
        </ErrorBoundary>
        <div className="NoteListMain__button-container">
          <CircleButton
            tag={Link}
            to="/add-note"
            type="button"
            className="NoteListMain__add-note-button"
          >
            <br />
            Add Note
          </CircleButton>
        </div>
      </section>
    );
  }
}
