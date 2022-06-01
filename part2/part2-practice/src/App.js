import React from 'react'
import Note from './components/Note'
import { useState, useEffect } from 'react'
import noteService from './services/notes'
import './index.css'
import Notification from './components/Notification'

const Footer = () =>{
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div stype={footerStyle}>
      <br />
      <em>Note app, Department of CS, NTU 2022</em>
    </div>
  )



}







const App = ({ notesArr }) => {

  // Initialise the piece of state (array of Notes)
  const [vNotes, setNotes] = useState([])

  // vNewnote is used to store user-submitted input
  const [vNewnote, setNewNote] = useState([]
    // Default value is "a new note..."
  )

  // Keep tracks of which notes should be displayed
  const [showAll, setShowAll] = useState(2)

  // Error Message
  const [errorMessage, setErrorMessage] = useState(null)
  const hook = () => {

    noteService.getAll()
      .then(response => {
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

    noteService.create(noteObject)
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
  const notesToShow = (showAll === 1) ? vNotes : vNotes.filter(note => note.important === false)

  // AN event handler function that passes it to every Note component
  const toggle = (id) => {

    // Find method is to find the note that is needed to modify, and assign it to note variable
    const note = vNotes.find(n => n.id === id)

    // Create a new object {... note} creates a new object with copies of all the properties from the note object
    const changedNote = {...note, important: !note.important}

    console.log(changedNote)
    console.log('importance of ' + id + ' needs to be toggled')

    // PUT request to the backend where it will replace the old object
    noteService.update(id, changedNote).then(response => {
    // Callback functions sets the component state 
    // If note.id != id (use back old Array) else (use server.data)
    setNotes(vNotes.map(note => note.id !== id ? note : response.data))
    }).catch(error => {
      // Add a descriptive error message
      setErrorMessage(`Note '${note.content}' is already removed from server`)
      // After 5second, it will change to NULL
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)
      // Filter out the remaining element that is NOT ID
      setNotes(vNotes.filter(n => n.id !== id))
    })
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
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

      <Footer/>

    </div>
  )
}

export default App