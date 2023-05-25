import React, { useState } from "react";
import axios from "axios";
import "./SearchForm.css";

export default function SearchForm() {
  const [city, setCity] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function showTemperature(response) {
    setIsLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}
@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    let apiKey = "ac209dae1f283fb332a5bb7f50b0f468";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showTemperature);
  }

  function getInput(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" onChange={getInput} placeholder="Enter a city" />
      <input type="submit" value="Search" />
    </form>
  );

  if (isLoaded) {
    return (
      <div>
        {form}
        <ul className="SearchForm">
          <li> Temperature: {Math.round(weather.temperature)}°C </li>
          <li> Description: {weather.description}</li>
          <li> Humidity: {weather.humidity}%</li>
          <li> Wind: {weather.wind}km/h</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
