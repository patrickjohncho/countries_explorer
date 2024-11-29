//This file containts the country details component, which will be used to display the details of a selected country
import React from 'react';
import { Country } from '../types/Country';
import { Weather } from '../types/Weather';
import WeatherInfo from './WeatherInfo.tsx';

interface CountryDetailsProps {
  country: Country;
  weather: Weather | null;
  onBack: () => void;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ country, weather, onBack }) => {
  return (
    <div>
      <button onClick={onBack}>Back</button>
      <h2>{country.name} {country.emoji}</h2>
      <p>Capital: {country.capital}</p>
      {/*<p>Population: {country.population.toLocaleString()}</p>*/}
      <p>Languages: {country.languages.join(', ')}</p>
      <p>Currencies: {country.currency.join(', ')}</p>
      {/*<p>Neighboring Countries: {country.neighbouringCountries.join(', ')}</p>
      <p>Time Zones: {country.timezones.join(', ')}</p>*/}
      {weather && <WeatherInfo weather={weather} />}
    </div>
  );
};

export default CountryDetails;
