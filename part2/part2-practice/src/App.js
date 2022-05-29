import React from 'react'
import Note from './components/Note'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = ({notesArr}) => { 

  // Initialise the piece of state (array of Notes)
  const [vNotes, setNotes] = useState([])

  // vNewnote is used to store user-submitted input
  const [vNewnote, setNewNote] = useState([]
  // Default value is "a new note..."
  ) 

  // Keep tracks of which notes should be displayed
  const [showAll, setShowAll] = useState(2)


  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }
  // Runs after every completed render 
  useEffect(hook, [])

  // Functon as an event handler to the form element
  const addNote = (e) => {
    // Prevents the page to be refreshed
    e.preventDefault()
    console.log('button clicked', e.target)

    // Create new object that receive its content from vNewnote
    const noteObject = {
      content: vNewnote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: vNotes.length + 1,
    }

    // Add the note by updating the vNotes
    setNotes(vNotes.concat(noteObject))

    // Reset the value of the input
    setNewNote('')



  }

  // An event handler that gets the target.value and stores into the state of user-submitted input
  const handleNoteChange = (e) => {
    console.log(e.target.value)
    setNewNote(e.target.value)
  }

  // If ShowAll is True => vNotes else show only the ones that are important
  const notesToShow = (showAll == 1) ? vNotes : vNotes.filter(note => note.important === false)
  
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={()=> setShowAll(0)}>
          Important Notes
        </button>
        <button onClick={()=> setShowAll(1)}>
          Show All
        </button>

        
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note}/> )}
      </ul>
      <form onSubmit={addNote}>
        {/* onChange occurs when an event such as value of an element has been changed*/}
        <input value={vNewnote} onChange={handleNoteChange}/>
        <button type="submit">save</button>

      </form>




    </div>
  )
}

export default App