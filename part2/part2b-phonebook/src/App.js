import { useState, useEffect } from 'react'
import personService from './services/axios'


// Form for each Person
const Personform = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewnumber] = useState('')

  const addNumber = (e) => {
    e.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber
    }

    const isFound = persons.some(element => {
      if (element.name === personObj.name) {
        return true
      } else {
        return false
      }
    })


    if (isFound === true) {

      alert(newName + 'is already added to phonebook')
    } else {
      personService.create(addNumber).then(response => {
        console.log(response)
        setNewName("")
        setNewnumber("")
      })
      //setPersons(persons.concat(personObj))

    }

  }

  return (
    <form onSubmit={addNumber}>
      <div>
        name: <input value={newName} onChange={e => setNewName(e.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={e => setNewnumber(e.target.value)} />
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>

  )
}

// Filters out based on searchTerm then map/render it to the website
const Content = ({ persons, searchTerm }) => {

  return (persons.filter(f => {
    /* Case: If phonebook name is included in Searchterm => return the variable else return nothing */
    if (f.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return f
    }
  }).map(f => {
    return <li key={f.name}>{f.name} | {f.number}</li>
  })
  )


}
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



  //  <Content persons={persons} searchTerm={searchTerm} />
  return (
    <>
      <div>
        <p>Filter:   <input type="text" placeholder="Filter..." onChange={event => setSearchTerm(event.target.value)} /> </p>

      </div>
      <div>
        <h2>Phonebook</h2>
        <Personform persons={persons} setPersons={setPersons} />
        <h2>Numbers</h2>
        <button>Delete</button>


      </div>
    </>
  )
}

export default App