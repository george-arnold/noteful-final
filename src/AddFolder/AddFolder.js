import React, {Component} from 'react'; 
import config from '../config';
import NoteContext from '../NoteContext';
import './AddFolder.css'
import PropTypes from 'prop-types';


class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: ''
    }
  }

  static contextType = NoteContext;
  // submit the name from the input to the state
  handleChange(e) {
    this.setState({
      folderName:  e
    })
  }
  
  
  handleSubmit = (e) => {
    e.preventDefault();
    const {folderName} = this.state;
    const newFolder = {
      name: folderName
    }
    console.log('folderName is', folderName );
    console.log('addfolder object is', newFolder);

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newFolder),
      }).then (function(response) {
          if(!response.ok){
              return;
          }
          return response.json();

    }).then( newFolder => {
      this.context.addNewFolder(newFolder);
      this.props.history.push(`/`);

    })

    .catch(function (error) {
      console.log('Request failed', error);
    })
  }

  

  render() {
    return (
    <form onSubmit ={e=> this.handleSubmit(e)} >
      <label htmlFor='folder-name' className = 'label'>Folder Name</label>
      <input id='folder-name' name= 'folder-name' type= 'text' onChange = {e => this.handleChange(e.target.value)} ></input>
      <input className= 'Submit' type='submit' value = "Submit"></input>
    </form>
    )
  }
}
export default AddFolder;