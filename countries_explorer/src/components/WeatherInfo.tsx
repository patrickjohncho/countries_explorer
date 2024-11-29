//This file contains the weather info component, which will be used to display the weather information of a selected country
import React from 'react';
import { Weather } from '../types/Weather';

interface WeatherInfoProps {
  weather: Weather;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather }) => {
  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3>Current Weather</h3>
      <p>
        <strong>Condition:</strong> {weather.condition}
      </p>
      <p>
        <strong>Temperature:</strong> {weather.temperature}°C
      </p>
      <img src={weather.icon} alt={weather.condition} title={weather.condition} />
    </div>
  );
};

export default WeatherInfo;
