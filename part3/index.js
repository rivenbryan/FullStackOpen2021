let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2022-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2022-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2022-05-30T19:20:14.298Z",
        important: true
    }
]

// Importing express which is a function
const express = require('express')
// Creating an express application and store it into app
const app = express()

// Allow request from all origins
const cors = require('cors')
app.use(cors())

// Activate json-parser 
app.use(express.json())


// #2 Route: Event handler that is used to handle HTTP GET request
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

// #3 Route: Fetching a single resource
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    // (Leveraging the fact that all javascript objects are truthy)
    // Only falsy when it is UNDEFINED
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

// #4 Route: Deleting a resources by making an HTTP DELETE request
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})
const generateID = () => {

    // Find largest id number in the current list
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0

    return maxId + 1


}
// #5 Route: Adding a resource by making an HTTP POST reques
app.post('/api/notes', (request, response) => {
    const body = request.body

    // Content property cannot be empty
    if (!body.content){
        return response.status(400).json({
            error: 'content missing'
        })
    }
    
    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateID()
    }

    // Concat the array
    notes = notes.concat(note)
    response.json(note)


})





const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})