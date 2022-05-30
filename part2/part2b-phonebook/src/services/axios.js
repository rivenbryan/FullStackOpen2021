import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseURL)
}

const create = (newObject) => {
    return axios.post(baseURL, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject)
}

const deleteA = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

// Module returns an obejct that has three functions
export default { getAll,create,update, deleteA }