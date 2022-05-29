
// Loop through dictionary
const OneCountry = ({ countries }) => {

    if (!countries.languages){
        console.log('no data')
    } 
    if (!Array.isArray(countries.languages)) {
         console.log('results are not array')
    }
    console.log(countries.languages)
    return (
        <div>
            <h2>{countries.name.common}</h2>
            <p>Capital: {countries.capital}</p>
            <p>Area: {countries.area}</p>
            <p>Language:  </p>

           

        </div>
    )
}

export default OneCountry
