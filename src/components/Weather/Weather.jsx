// styles & assets
import './Weather.scss';
import { useState, useEffect } from 'react';

//components
import StatItem from '../StatItem/StatItem';

// images
import sunnyImg from '../../assets/sunny.png';
import cloudyImg from '../../assets/cloudy.png';
import rainyImg from '../../assets/rain.png';
import snowyImg from '../../assets/snow.png';
import drizzleImg from '../../assets/drizzle.png';
import mistyImg from '../../assets/mist.png';
import searchImg from '../../assets/search.svg';

function Weather() {
    const [ city, setCity ] = useState('Israel');
    const [ weather, setWeather ] = useState({});
    const [ statistics, setStatistics ] = useState({});
    const apiKey = 'e672897f38e611f2e3a354e5021fa94c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // functions
    function getWeatherImage(weatherMain) {
        switch(weatherMain) {
            case 'Clear':
                return sunnyImg;
            case 'Clouds':
                return cloudyImg;
            case 'Rain':
                return rainyImg;
            case 'Snow':
                return snowyImg;
            case 'Drizzle':
                return drizzleImg;
            case 'Mist':
                return mistyImg;
            default:
                return sunnyImg;
        }
    }

    async function getWeather() {
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
            });
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWeather();
    }, [city]);

    return (
        <div className="container">
            <div className="weather-app">
                <form className='weather-form'>
                    <input placeholder='Search by city or country' type="text" className="weather-input" />
                    <button className='weather-button'>
                        <img src={searchImg} alt="Search" />
                    </button>
                </form>

                <div className="weather-interface">
                    <div className="weather-info">
                        <img src={getWeatherImage(weather.weatherMain)} alt="Current Weather" className="weather-img" />

                        <div className="weather-text">
                            <h1 className="location">Valle de Angeles, HN</h1>
                            <p className="date">Monday 01/17/2022</p>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather;