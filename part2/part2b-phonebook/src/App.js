import { useState, useEffect } from 'react'
import axios from 'axios'


// Form for each Person
const Personform = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewnumber] = useState('')
  
  const addNumber = (e) => {
    e.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber
    }

    const isFound = persons.some(element => {
      if (element.name == personObj.name) {
        return true
      } else {
        return false
      }
    })


    if (isFound == true) {

      alert(newName + 'is already added to phonebook')
    } else {

      setPersons(persons.concat(personObj))
      setNewName("")
      setNewnumber("")
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
const Filter = ({ persons, searchTerm }) => {
  {
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

}
const App = () => {

  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
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
        <h2>Phonebook</h2>
        <Personform persons={persons} setPersons={setPersons} />
        <h2>Numbers</h2>
        <Filter persons={persons} searchTerm={searchTerm} />


      </div>
    </>
  )
}

export default App