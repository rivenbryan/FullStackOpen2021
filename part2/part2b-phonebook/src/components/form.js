import { useState } from 'react'
import personService from '../services/axios'
import React from 'react'

const Personform = ({ persons, setPersons, setMessage }) => {
    
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

            if (window.confirm(`${personObj.name} is already added to phonebook, replace the old number with a new one?`)) {
                // Find function to get the person from the array
                const person = persons.find(person => person.name === personObj.name)

                console.log("the person id is " + person.id)

                // Get new Object
                const updatedPerson = { ...person, number: newNumber }

                console.log("updatedPerso is " + updatedPerson)
                // Update the Axis & Update State
                personService.update(person.id, updatedPerson).then(response => {
                    setPersons(persons.map(element => element.id !== person.id ? element : response.data))
                   
                    setMessage(`Updated ${personObj.name} successfully!`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                }).catch(error =>{
                    console.log('error')
                    setMessage(`Information of ${personObj.name} has been deleted from server!`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                    
                    setPersons(persons.filter(element => element.id !== person.id))
                    
                })


            }


        } else {
            personService.create(personObj).then(response => {
                console.log("data", response.data)
                setNewName("")
                setNewnumber("")
                setPersons(persons.concat(response.data))
                setMessage(`Added ${newName} successfully!`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)


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