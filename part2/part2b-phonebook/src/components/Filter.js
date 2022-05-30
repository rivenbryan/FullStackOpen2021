
import React from 'react'
const Filter = ({setSearchTerm}) => {

    return (
        <p>Filter: 
            <input 
            type="text" 
            placeholder="Filter..." 
            onChange={event => setSearchTerm(event.target.value)} /> 
        </p>
    )
}


export default Filter