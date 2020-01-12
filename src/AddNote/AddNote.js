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
      toApi: {
        noteName: "",
        noteContent: "",
        toThisFolder: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1"
      },
      touched: false
    };
  }

  handleNameChange(e) {
    if (e.length === 0) {
      this.setState({
        touched: false
      });
    } else
      this.setState({
        toApi: { noteName: e },
        touched: true
      });
  }

  validateName() {
    //trim will get rid of any whitespace that the user enters
    const name = this.state.toApi.noteName.trim();
    if (name.length === 0) {
      return "Please enter a Name";
    }
  }

  handleContentChange(e) {
    this.setState({
      toApi: { noteContent: e }
    });
  }

  handleFolderChange(e) {
    this.setState({
      toApi: { toThisFolder: e }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("State at handle is", this.state);
    const { noteName, noteContent, toThisFolder } = this.state.toApi;
    const newNote = {
      name: noteName,
      content: noteContent,
      folderId: toThisFolder
    };
    console.log(newNote);

    if (this.state.touched) {
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
          console.log();
          this.context.addNewNote(newNote);
          this.props.history.push(`/`);
        })
        .catch(function(error) {
          console.log("Request failed", error);
        });
    }
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
          {this.state.touched && (
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
            {options}
          </select>
        </div>
        <input
          type="submit"
          value="Submit"
          disabled={!this.state.touched}
        ></input>
      </form>
    );
  }
}
export default AddNote;
