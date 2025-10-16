import './StatItem.scss';

// images
import visibility from '../../assets/eye.svg';
import humidity from '../../assets/water.svg';
import temperature from '../../assets/temperature.svg';
import wind from '../../assets/windy.svg';

function StatItem({ name, value }) {
    let image, metrics;

    switch(name) {
        case 'Visibility':
            image = visibility;
            metrics = 'km';
            break;
        case 'Humidity':
            image = humidity;
            metrics = '%'
            break;
        case 'Feels like':
            image = temperature;
            metrics = '°C';
            break;
        case 'Wind':
            image = wind;
            metrics = 'm/s';
            break;
    }

    return (
        <div className={`stat-item`}>
            <div className="stat-main">
                <img className='stat-img' src={image} alt="Stat Icon" />
                <p className="stat-name">{name}</p>
            </div>
            <p className="stat-info">{`${value}${metrics}`}</p>
        </div>
    )
}

export default StatItem;