// styles & assets
import './Weather.scss';
import { useState, useEffect } from 'react';

//components & functions
import StatItem from '../StatItem/StatItem';
import { getWeatherImage } from '../WeatherUtils/WeatherUtils';

// images
import searchImg from '../../assets/search.svg';
import loadingImg from '../../assets/refresh.svg';

function Weather() {
    // states
    const [ city, setCity ] = useState('Kyiv');
    const [ inputValue, setInputValue ] = useState('');
    const [ weather, setWeather ] = useState({});
    const [ loading, setLoading ] = useState(false);
    const [ suggestions, setSuggestions ] = useState([]);

    // API KEY
    const apiKey = 'e672897f38e611f2e3a354e5021fa94c';

    // date
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weatherDate = `${days[date.getDay()]} ${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}/${date.getFullYear()}`;

    // functions
    function handleInputChange(e) {
        setInputValue(e.target.value);
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

    async function getWeather() {
        setLoading(true);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        
        try {
            if (data.cod !== 200) {
                throw new Error(`Error: ${data.message}`);
            }

            setWeather({
                temperature: data.main.temp,
                feelsLike: data.main.feels_like,
                humidity: data.main.humidity,
                visibility: data.visibility,
                wind: data.wind.speed,
                weatherMain: data.weather[0].main,
                weatherDescription: data.weather[0].description, 
                cityName: data.name,
                countryCode: data.sys.country,
            });
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    //hooks
    useEffect(() => {
        if (!city) return;
        getWeather();
    }, [city]);

    useEffect(() => {
        if (inputValue.length < 2) {
            setSuggestions([]);  // hide suggestions if input is less than 2 characters
            return;
        }

        const fetchSuggestins = async() => {
            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.length > 0) {
                setSuggestions(data); // store suggestions only if there are valid results
            } else {
                setSuggestions([]); // clear suggestions if no valid results
            }
        }

        fetchSuggestins();
    }, [inputValue])

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
                                onClick={() => {
                                    setCity(`${suggestion.name}, ${suggestion.country}`);
                                    setInputValue(''); // clear input field
                                    setSuggestions([]); // clear suggestions
                                    getWeather(); // immediately fetch the weather data for the selected city
                                }}
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
                        <h2 className="current-temperature">{Math.round(weather.temperature)}</h2>
                        <p className="weather-details">{weather.weatherDescription}</p>
                    </div>

                    <div className="weather-stats">
                        <div className="stats-column">
                            <StatItem value={weather.visibility / 1000} name={'Visibility'} />
                            <StatItem value={weather.humidity} name={'Humidity'} />
                        </div>

                        <div className="stats-column">
                            <StatItem value={Math.round(weather.feelsLike)} name={'Feels like'} />
                            <StatItem value={weather.wind} name={'Wind'} />
                        </div>
                    </div></>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Weather;