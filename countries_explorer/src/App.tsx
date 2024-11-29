//This file contains the main page of the application
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';
import { Country } from './types/Country';
import { Weather } from './types/Weather';

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);

  const handleSearch = async (query: string) => {
    //Fetch countries from the GraphQL API
    //const fetchedCountries: Country[] = []; //Replace with API call
    //setCountries(fetchedCountries); //set countries for the list
  };

  const handleSelectCountry = async (country: Country) => {
    setSelectedCountry(country);

    //Fetch weather data for the selected country's capital
    const fetchedWeather: Weather = {
      temperature: 25, // Replace with actual API call
      condition: 'Sunny',
      icon: 'https://via.placeholder.com/50',
    };
    setWeather(fetchedWeather);
  };

  const handleBack = () => {
    setSelectedCountry(null);
    setWeather(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      {!selectedCountry ? (
        <>
          <SearchBar onSearch={handleSearch} />
          <CountryList countries={countries} onSelect={handleSelectCountry} />
        </>
      ) : (
        <CountryDetails country={selectedCountry} weather={weather} onBack={handleBack} />
      )}
    </div>
  );
};

export default App;
