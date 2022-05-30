// Filters out based on searchTerm then map/render it to the website
import personService from '../services/axios'

const Content = ({ persons, searchTerm, setPersons }) => {

    const DeleteFunction = (id) => {
        console.log("The ID is " + id)

        const person = persons.find(person => person.id === id)
        console.log("person object is " + person.name)
        
        


        if(window.confirm(`Do you want to delete ${person.name}? `)){
            personService
            .deleteA(id)
            setPersons(persons.filter(person => person.id !== id))
        }
      

    }

    return (
        <div>
            <h2>Numbers</h2>

            {persons.filter(f => {
                /* Case: If phonebook name is included in Searchterm => return the variable else return nothing */
                if (f.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return f
                }
            }).map(f => {
                return <li key={f.name}>{f.name} | {f.number}
                    <button onClick={() => DeleteFunction(f.id)}>Delete</button></li>
            })}
        </div>




    )



}

export default Content