import React from 'react'
import Note from './components/Note'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = ({ notesArr }) => {

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
    }

    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        console.log(response)
        setNotes(vNotes.concat(response.data))
        setNewNote('')
      })
  }

  // An event handler that gets the target.value and stores into the state of user-submitted input
  const handleNoteChange = (e) => {
    console.log(e.target.value)
    setNewNote(e.target.value)
  }

  // If ShowAll is True => vNotes else show only the ones that are important
  const notesToShow = (showAll == 1) ? vNotes : vNotes.filter(note => note.important === false)

  // AN event handler function that passes it to every Note component
  const toggle = (id) => {

    // Find method is to find the note that is needed to modify, and assign it to note variable
    const note = vNotes.find(n => n.id === id)

    // Create a new object {... note} creates a new object with copies of all the properties from the note object
    const changedNote = {...note, important: !note.important}

    console.log('importance of ' + id + 'needs to be toggled')

    // PUT request to the backend where it will replace the old object
    axios.put(`http://localhost:3001/notes/${id}`, changedNote).then(response => {
    // Callback functions sets the component state 
    

    // If note.id != id (use back old Array) else (use server.data)
    setNotes(vNotes.map(note => note.id !== id ? note : response.data))
    })
  }
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(0)}>
          Important Notes
        </button>
        <button onClick={() => setShowAll(1)}>
          Show All
        </button>


      </div>
      <ul>
        {notesToShow.map(note => <Note
          key={note.id}
          note={note}
          toggle={() => toggle(note.id)} />)}
      </ul>
      <form onSubmit={addNote}>
        {/* onChange occurs when an event such as value of an element has been changed*/}
        <input value={vNewnote} onChange={handleNoteChange} />
        <button type="submit">save</button>

      </form>




    </div>
  )
}

export default App