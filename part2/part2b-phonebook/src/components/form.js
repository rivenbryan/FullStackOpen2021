import { useState } from 'react'
import personService from '../services/axios'

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
            
            if(window.confirm(`${personObj.name} is already added to phonebook, replace the old number with a new one?`)){
                // Find function to get the person from the array
                const person = persons.find(person => person.name === personObj.name)

                console.log("the person id is " + person.id)
                
                // Get new Object
                const updatedPerson = {...person, number: newNumber}
            
                console.log("updatedPerso is " + updatedPerson)
                // Update the Axis & Update State
                personService.update(person.id, updatedPerson).then(response => 
                  setPersons(persons.map(element => element.id !== person.id ? element : response.data)))

            }


        } else {
            personService.create(personObj).then(response => {
                console.log(response)
                setNewName("")
                setNewnumber("")
                setPersons(persons.concat(response.data))
            })

        }

    }

    return (
        <div>
           <h2>PhoneBook</h2>

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
        </div>

    )
}

export default Personform