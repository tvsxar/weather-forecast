// styles & assets
import './Weather.scss';
import { useState, useEffect, useContext } from 'react';

//components & context
import StatItem from '../StatItem/StatItem';
import WeatherContext from '../../context/WeatherContext';

// images
import searchImg from '../../assets/search.svg';
import loadingImg from '../../assets/refresh.svg';

function Weather() {
    const { getWeatherImage, setCity, 
        loading, suggestions, 
        setSuggestions, weather, 
        getWeather, inputValue, setInputValue } = useContext(WeatherContext);

    // date
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weatherDate = `${days[date.getDay()]} ${date.getDate() < 10 
        ? '0' + date.getDate() 
        : date.getDate()}/${date.getMonth() < 10 
            ? '0' + date.getMonth() 
            : date.getMonth()}/${date.getFullYear()}`;

    // functions
    function handleInputChange(e) {
        setInputValue(e.target.value);
        if (e.target.value.length < 2) {
            setSuggestions([]);
        }
    }

    function setCityName(e) {
        e.preventDefault();

        if (!inputValue.trim()) {
            alert("Enter the city name!");
            return;
        }

        setCity(inputValue);
        setInputValue('');
        setSuggestions([]);
    }

    function handleSearch(name, country) {
        setCity(`${name}, ${country}`);
        setInputValue(''); // clear input field
        setSuggestions([]); // clear suggestions
        getWeather(); // immediately fetch the weather data for the selected city
    }

    return (
        <div className="container">
            <div className="weather-app">
                <form className='weather-form'>
                    <input value={inputValue} placeholder='Search by city or country'  
                    type="text" className="weather-input" onChange={handleInputChange} />
                    <button onClick={setCityName} className='weather-button'>
                        <img src={searchImg} alt="Search" />
                    </button>
                </form>

                {inputValue.length > 1 && suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSearch(suggestion.name, suggestion.country)}
                            >
                                {suggestion.name}, {suggestion.country}
                            </li>
                        ))}
                    </ul>
                )}

                <div className="weather-interface">
                    {loading ? (
                        <div className="loading-container">
                            <img src={loadingImg} alt="" className="loading-icon" />
                        </div>
                    ) : (
                        <>
                        <div className="weather-info">
                        <img src={getWeatherImage(weather.weatherMain)} alt="Current Weather" className="weather-img" />

                        <div className="weather-text">
                            <h1 className="location">{`${weather.cityName}, ${weather.countryCode}`}</h1>
                            <p className="date">{weatherDate}</p>
                        </div>
                    </div>

                    <div className="weather-temperature">
                        <h2 className="current-temperature">
                            {weather.temperature !== undefined ? Math.round(weather.temperature) : '-'}
                        </h2>
                        <p className="weather-details">{weather.weatherDescription}</p>
                    </div>

                    <div className="weather-stats">
                        <div className="stats-column">
                            <StatItem value={weather.visibility ? weather.visibility / 1000 : 0} name={'Visibility'} />
                            <StatItem value={weather.humidity ?? 0} name={'Humidity'} />
                        </div>

                        <div className="stats-column">
                            <StatItem value={weather.feelsLike ? Math.round(weather.feelsLike) : 0} name={'Feels like'} />
                            <StatItem value={weather.wind ?? 0} name={'Wind'} />
                        </div>
                    </div></>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Weather;