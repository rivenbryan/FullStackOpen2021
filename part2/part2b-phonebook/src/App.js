import React from 'react'
import { useState, useEffect } from 'react'
import personService from './services/axios'
import Personform from './components/form'
import Content from './components/Content'
import Filter from './components/Filter'
import Notification from './components/Notification'


const App = () => {

  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)


  // Runs after every completed render 
  useEffect( () => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
      <div>       
        <Notification message={message}/>
        <Filter setSearchTerm={setSearchTerm} />
        <Personform persons={persons} setPersons={setPersons} setMessage={setMessage} />
        <Content persons={persons} searchTerm={searchTerm} setPersons={setPersons} />
      </div>
  )
}

export default App