import React, {Component} from 'react';

class AddNote extends Component {
  render() {
    return (
      <form>
        {/* Input for name of note */}
<input name= 'name'></input>

{/* input for content to go into note */}
<textarea name= 'content'></textarea>

{/* should populate a list of existing folders */}
<select name= 'folder'></select>

<input type= "submit" value ='Submit'></input>
      </form>
    )
  }
}
export default AddNote;