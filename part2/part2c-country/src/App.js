import React, { useState, useEffect } from 'react'
import Country from './components/country'
import Filter from './components/Filter'



const App = () => {


  // Filter State
  const [filtertext, getFilter] = useState('')
  // State to contain ALL countries
  const [ALLcountry, setallCountries] = useState([])



  /* Fetching from JSON website */
  const getData = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setallCountries(res)
      })
  }

  useEffect(getData, [])

  const filteredcountries = ALLcountry.filter(country => country.name.common.toLowerCase().includes(filtertext.toLowerCase()))
  
  return (
    <div>
      <h2>Countries</h2>
      <Filter getFilter={getFilter} />
      <Country filteredcountries={filteredcountries} getFilter={getFilter} />
    </div>
  )
}

export default App
