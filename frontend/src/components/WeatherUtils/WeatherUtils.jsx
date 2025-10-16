import sunnyImg from '../../assets/sunny.png';
import cloudyImg from '../../assets/cloudy.png';
import rainyImg from '../../assets/rain.png';
import snowyImg from '../../assets/snow.png';
import drizzleImg from '../../assets/drizzle.png';
import mistyImg from '../../assets/mist.png';

export function getWeatherImage(weatherMain) {
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