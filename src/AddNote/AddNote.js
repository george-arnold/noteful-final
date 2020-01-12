import React, { Component } from "react";
import "./AddNote.css";
import NoteContext from "../NoteContext";
import config from '../config';

class AddNote extends Component {
  static contextType = NoteContext;

  constructor(props) {
    super(props);
    this.state = {
      noteName: "",
      noteContent: "",
      toThisFolder: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1"
    };
  }

  handleNameChange(e) {
    this.setState({
      noteName: e
    });
  }

  handleContentChange(e) {
    this.setState({
      noteContent: e
    });
  }

  handleFolderChange(e) {
    this.setState({
      toThisFolder: e
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("State at handle is", this.state);
    const { noteName, noteContent, toThisFolder } = this.state;
    const newNote = {
      name: noteName,
      content: noteContent,
      folderId: toThisFolder
    };
    console.log(newNote);

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newNote)
    })
      .then(function(response) {
        if (!response.ok) {
          return;
        }
        return response.json;
      })
      .then(newNote => {
        console.log()
        this.context.addNewNote(newNote);
        this.props.history.push(`/`);
      })
      .catch(function(error) {
        console.log("Request failed", error);
      });
  }

  render() {
    const options = this.context.folders.map(folder => (
      <option id={folder.id} key={folder.id} value={folder.id}>
        {" "}
        {folder.name}
      </option>
    ));
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        {/* Input for name of note */}
        <div className="Labels">
          <label htmlFor="name"> Name of Note </label>
          <input
            name="name"
            onChange={e => this.handleNameChange(e.target.value)}
          ></input>
        </div>
        <div className="Labels">
          {/* input for content to go into note */}
          <label htmlFor="content"> Content of Note </label>
          <textarea
            name="content"
            onChange={e => this.handleContentChange(e.target.value)}
          ></textarea>
        </div>
        <div className="Labels">
          {/* should populate a list of existing folders */}
          <label htmlFor="folder"> Name of Folder </label>
          <select
            name="folder"
            onChange={e => this.handleFolderChange(e.target.value)}
          >
            {options}
          </select>
        </div>
        <input type="submit" value="Submit"></input>
      </form>
    );
  }
}
export default AddNote;
