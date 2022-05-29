
// Loop through dictionary
const OneCountry = ({ countries }) => {

    console.log('Object.entries')
    console.log(
        Object.entries(countries.languages)

    )

    console.log(
        Object.entries(countries.languages)
        .map( ([key, value]) => `My key is ${key} and my value is ${value}` )
      )

    return (
        <div>
            <h2>{countries.name.common}</h2>
            <p>Capital: {countries.capital}</p>
            <p>Area: {countries.area}</p>
            <p>Language  </p>
            {
                Object.entries(countries.languages).map(([key,value]) => <li key={key}>{value}</li>)
            }



        </div>
    )
}

export default OneCountry
