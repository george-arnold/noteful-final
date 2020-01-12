import React, {Component} from 'react'; 
import config from '../config';

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: ''
    }
  }
  // submit the name from the input to the state
  handleChange(e) {
    this.setState({
      folderName:  e
    })
  }
  
  
  handleSubmit(e) {
    e.preventDefault();
    
    const {folderName} = this.state;
  
    const addFolder = {
      name: folderName
    }
    console.log('folderName is', folderName );
    console.log('addfolder object is', addFolder);

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(addFolder),
    }).then (function(response) {
        if(!response.ok){
            return;
        }
        return response.json();

    }).then(function(data) {
      console.log(data);
    })
  //   fetch(`${config.API_ENDPOINT}/folders`, {
  //     method: 'post',

  //     body: JSON.stringify(folderName),

  //   }).then(
  //   function(response) {
  //     response.json().then(function(data) {
  //       console.log(data);
  //   })}
  //   )
  //   .catch(function (error) {
  //     console.log('Request failed', error);
  //   })
  // }
  }

  render() {
    return (
    <form onSubmit ={e => this.handleSubmit(e)} >
      <label htmlFor='folder-name'>Folder Name</label>
      <input id='folder-name' name= 'folder-name' type= 'text' onChange = {e => this.handleChange(e.target.value)} ></input>
      <input type= 'submit' value= 'Submit'></input>
    </form>
    )
  }
}
export default AddFolder;