import { useState, useEffect } from 'react'
import personService from './services/axios'
import Personform  from './components/form'
import Content from './components/Content'

const App = () => {

  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const hook = () => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }
  // Runs after every completed render 
  useEffect(hook, [])

  return (
    <>
      <div>
        <p>Filter:   <input type="text" placeholder="Filter..." onChange={event => setSearchTerm(event.target.value)} /> </p>
      </div>
      <div>
        <Personform persons={persons} setPersons={setPersons} />
        <Content persons={persons} searchTerm={searchTerm} setPersons={setPersons}/>


      </div>
    </>
  )
}

export default App