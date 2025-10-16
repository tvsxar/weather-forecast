import { createContext, useState, useEffect } from 'react';

// Images
import sunnyImg from '../assets/sunny.png';
import cloudyImg from '../assets/cloudy.png';
import rainyImg from '../assets/rain.png';
import snowyImg from '../assets/snow.png';
import drizzleImg from '../assets/drizzle.png';
import mistyImg from '../assets/mist.png';

const WeatherContext = createContext();

function WeatherProvider({children}) {
    const [ weather, setWeather ] = useState({});
    const [ loading, setLoading ] = useState(false);
    const [ suggestions, setSuggestions ] = useState([]);
    const [ city, setCity ] = useState('Kyiv');
    const [ inputValue, setInputValue ] = useState('');

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
        const url = `${import.meta.env.VITE_API_URL}/weather?city=${city}`;

        try {
            setLoading(true);
            const response = await fetch(url);
            const data = await response.json();

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
            console.log(weather);
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchSuggestions() {
        const url = `${import.meta.env.VITE_API_URL}/geo?city=${inputValue}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.length > 0) {
                setSuggestions(data); // store suggestions only if there are valid results
            } else {
                setSuggestions([]); // clear suggestions if no valid results
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!city) return;

        getWeather();
    }, [city]);

    useEffect(() => {
        if (inputValue.length < 2) {
            setSuggestions([]);  // hide suggestions if input is less than 2 characters
            return;
        }
    
        fetchSuggestions();
    }, [inputValue])

    return (
        <WeatherContext.Provider value={{
            weather, setWeather,
            loading, setLoading,
            suggestions, setSuggestions,
            city, setCity,
            inputValue, setInputValue,
            getWeatherImage, getWeather,
            fetchSuggestions,
        }}>
          {children}
        </WeatherContext.Provider>
    )
}

export { WeatherProvider };
export default WeatherContext;