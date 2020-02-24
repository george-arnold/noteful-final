import React, { Component } from "react";
import "./AddNote.css";
import NoteContext from "../NoteContext";
import config from "../config";
import ValidationError from "../ValidationError";

class AddNote extends Component {
  static contextType = NoteContext;

  constructor(props) {
    super(props);
    this.state = {
      noteName: "",
      noteContent: "",
      folderid: ""
    };
  }

  handleNameChange(name) {
    this.setState({
      noteName: name
    });
  }

  validateName() {
    //trim will get rid of any whitespace that the user enters
    const name = this.state.noteName.value.trim();

    if (name.length === 0) {
      return "Please enter a Name";
    }
  }

  handleContentChange(content) {
    this.setState({
      noteContent: content
    });
  }

  handleFolderChange(folderid) {
    this.setState({
      folderid
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { noteName, noteContent, folderid } = this.state;
    const newNote = {
      name: noteName,
      content: noteContent,
      folderid
    };

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newNote)
    })
      .then(function json(response) {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then(newNote => {
        this.context.addNewNote(newNote);
        this.props.history.push(`/`);
      })
      .catch(function(error) {
        console.log("Request failed", error);
      });
  };

  render() {
    const isValid =
      this.state.noteName.length > 0 &&
      this.state.noteContent.length > 0 &&
      this.state.folderid.length > 0;
    const options = this.context.folders.map(folder => (
      <option id={folder.id} key={folder.id} value={folder.id}>
        {" "}
        {folder.name}
      </option>
    ));
    return (
      <form onSubmit={this.handleSubmit}>
        {/* Input for name of note */}
        <div className="Labels">
          <label htmlFor="name"> Name of Note </label>
          <input
            name="name"
            onChange={e => this.handleNameChange(e.target.value)}
          ></input>
          {this.state.valid && (
            <ValidationError message={this.validateName()} />
          )}
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
            {" "}
            <option>--</option>
            {options}
          </select>
        </div>
        <input type="submit" value="Submit" disabled={!isValid}></input>
      </form>
    );
  }
}
export default AddNote;
