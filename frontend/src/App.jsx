import Weather from './components/Weather/Weather';
import { WeatherProvider } from './context/WeatherContext';

function App() {

  return (
    <WeatherProvider>
      <Weather />
    </WeatherProvider>
  )
}

export default App
