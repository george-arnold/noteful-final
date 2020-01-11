import React, {Component} from 'react'
import { NavLink, Link } from 'react-router-dom'
import CircleButton from '../CircleButton/CircleButton'
import NoteContext from '../NoteContext'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'


//this is the list of folders
class NoteListNav extends Component {
  static contextType = NoteContext;

  render () {
    // sets the default value of this.context.value to empty array
    const { folders=[], notes=[] } = this.context
  
  return (
    <div className='NoteListNav'>
      <ul className='NoteListNav__list'>
        {/* takes folders passed from App's state, for each maps a li with key= folder object id key/value */}
        {folders.map(folder =>
          <li key={folder.id}>
            {/* for each folder is using NavLink which will send user to /folder/idOfFolderClicked */}
            <NavLink
              className='NoteListNav__folder-link'
              to={`/folder/${folder.id}`}
            >
 {/* filters the notes array for matches to the folder id, holds onto the length of the array storing the matches, prints the small number */}
              <span className='NoteListNav__num-notes'>
                {countNotesForFolder(notes, folder.id)}
              </span>
              {/* displays the name of each folder on the screen */}
              {folder.name}
            </NavLink>
          </li>
        )}
      </ul>
      <div className='NoteListNav__button-wrapper'>
        {/* circle button links to add- folder path */}
        <CircleButton
          tag={Link}
          to='/add-folder'
          type='button'
          className='NoteListNav__add-folder-button'
        >
          <br />
          Add Folder
        </CircleButton>
      </div>
    </div>
  )
}
}
export default NoteListNav;