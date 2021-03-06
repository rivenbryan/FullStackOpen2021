import OneCountry from './details'
const Country = ({ filteredcountries }) => {

    return (
        <div>
            {filteredcountries.length > 10 && <p>too many matches, specify another filter</p>}
            {filteredcountries.length < 10 && filteredcountries.length > 1 && <p>{filteredcountries.map(country => { 
                return <li key={country.name.common}>
                    {country.name.common}
                </li>
            })}</p>}
             {filteredcountries.length === 1 && <OneCountry countries={filteredcountries[0]}/>}
           
        </div>
    )
}

export default Country