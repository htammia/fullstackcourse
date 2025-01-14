import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const WeatherIcon = ({ icon }) => {

  return(
    <div>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}></img>
    </div>
  ) 
}

const Weather = ({ country }) => {
  const [capitalWeather, setCapitalWeather] = useState(null)

  const lat = country['capitalInfo']['latlng'][0]
  const lon = country['capitalInfo']['latlng'][1]

  useEffect(() => {
    weatherService
      .get(lat, lon)
      .then(returnedData => {
        setCapitalWeather(returnedData)
      })
  }, [])

  if (!capitalWeather){
    return null
  }

  return(
    <div>
      Temperature {capitalWeather.main.temp} Celsius
      <WeatherIcon icon={capitalWeather.weather[0].icon}/>
      Wind {capitalWeather.wind.speed} m/s
    </div>
  )
}

export default Weather