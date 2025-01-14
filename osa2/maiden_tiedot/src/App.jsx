import { useEffect, useState } from 'react'
import countryService from './services/countries'
import Weather from './components/Weather'

const Country = ({ country, showDetails }) => {

  return (
    <div>
      {country['name']['common']}
      <button onClick={() => showDetails(country)}>Show</button>
    </div>
  )
}

const Flag = ({ flags }) => {
  return(
    <img src={flags['png']}></img>
  )
}

const MatchedCountry = ({ country }) => {
  return(
    <div>
      <h1>{country['name']['common']}</h1>
      capital {country['capital']} 
      <br/>
      area {country['area']}

      <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map(language => 
            (<li key={language}>{language}</li>))}
        </ul>

      <div>
        <Flag flags={country['flags']}/>
      </div>
      <div>
        <h2>Weather in {country['capital']}</h2>
        <Weather country={country}/>
      </div>
    </div>
  )
}

const Countries = ({ countries, showDetails }) => {
  if (countries.length == 1) {
    return(
      <div>
        <MatchedCountry country={countries[0]}/>
      </div>
    )
  } else if (countries.length <= 10) {
    return (
      <div>
        Countries: {countries.map(country => 
          <Country
            key={country.name.common}
            country={country}
            showDetails={showDetails}
          />
        )}
      </div>
    )
  } else {
    return(
      <div>
        Too many matches, please specify another filter
      </div>
    )
  }
}

const Filter = ({countryFilter, onChange }) => {
    return (
      <div>
        find countries: <input value={countryFilter}
        onChange={onChange}/>
      </div>
    )
  }

const App =() => {
  const [countries, setCountries] = useState(null)
  const [countryFilter, setCountryFilter] = useState('')
  const [shownCountry, setShownCountry] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  // if no countries yet, render nothing
  if (!countries) {
    return null
  }

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
    setShownCountry(null)
  }

  const countriesToShow = countries.filter(item => 
    item.name.common.toLowerCase().includes(countryFilter.toLowerCase())
  )


  const showDetails = (country) => {
    setShownCountry(country)
  }

  return (
    <div>
      <h1>Countries</h1>
      <Filter countryFilter={countryFilter} onChange={handleFilterChange}/>
      {shownCountry ? (
        <MatchedCountry country={shownCountry} />
      ) : (
        <Countries countries={countriesToShow} showDetails={showDetails} />
      )}
    </div>
  )
}

export default App
