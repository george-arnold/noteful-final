import React, {Component} from 'react'; 

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
      folderName: {value: e}
    })
    console.log(this.state.folderName);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    // submit the name of the folder from state to the POST /folders endpoint
  }
  render() {
    return (
    <form onSubmit ={e => this.handleSubmit} >
      <label htmlFor='folder-name'>Folder Name</label>
      <input id='folder-name' name= 'folder-name' type= 'text' onChange = {e => this.handleChange(e.target.value)} ></input>
    </form>
    )
  }
}
export default AddFolder;