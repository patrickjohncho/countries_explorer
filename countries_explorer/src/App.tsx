import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from './graphql/queries';
import { fetchWeather, WeatherData } from './utils/fetchWeather';
import { Country } from './types/Country';
import CountryCard from './components/CountryCard';
import { useDebounce } from 'use-debounce';

const App: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const { loading, error, data } = useQuery(GET_COUNTRIES, {
    variables: { name: '' }, // Load all countries initially
  });

  // Set default country to Canada
  useEffect(() => {
    if (data && data.countries) {
      const canada = data.countries.find(
        (country: any) => country.name.toLowerCase() === 'canada'
      );
      if (canada) {
        setSelectedCountry({
          name: canada.name,
          capital: canada.capital,
          region: canada.awsRegion,
          emoji: canada.emoji,
          languages: canada.languages.map((lang: any) => lang.name),
          currency: canada.currency,
        });
        fetchWeather(canada.capital).then(setWeather);
      }
    }
  }, [data]);

  const handleSelectCountry = async (country: Country) => {
    setSelectedCountry(country);
    if (country.capital) {
      const weatherData = await fetchWeather(country.capital);
      setWeather(weatherData);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const countries: Country[] = data?.countries?.map((country: any) => ({
    name: country.name,
    capital: country.capital,
    region: country.awsRegion,
    emoji: country.emoji,
    languages: country.languages.map((lang: any) => lang.name),
    currency: country.currency,
  })) || [];

  const filteredCountries = countries
    .filter((country) =>
      country.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  if (loading) return <p className="text-center text-gray-500">Loading countries...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching countries: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Country Details Section */}
      <div className="bg-white shadow-md p-6 sticky top-0 z-10">
        {selectedCountry && (
          <div>
            <h1 className="text-3xl font-bold text-blue-600">{selectedCountry.name} {selectedCountry.emoji}</h1>
            <p className="mt-2"><strong>Capital:</strong> {selectedCountry.capital}</p>
            <p><strong>Region:</strong> {selectedCountry.region}</p>
            <p><strong>Languages:</strong> {selectedCountry.languages.join(', ')}</p>
            <p><strong>Currency:</strong> {selectedCountry.currency}</p>

            {weather && (
              <div className="mt-4">
                <h3 className="text-xl font-bold">Weather in {selectedCountry.capital}</h3>
                <p><strong>Temperature:</strong> {weather.temperature}°C</p>
                <p><strong>Condition:</strong> {weather.condition}</p>
                <img src={weather.icon} alt={weather.condition} className="mt-2 w-16 h-16" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search Bar and Scrollable Country List */}
      <div className="max-w-4xl mx-auto mt-4 p-4">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for a country..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-2 text-sm text-gray-500">Currently Selected: {selectedCountry?.name || 'None'}</p>
        </div>

        {/* Scrollable List */}
        <div
          style={{
            maxHeight: '200px', // Enforces scrollable height
            overflowY: 'auto', // Enables vertical scrolling
          }}
          className="border border-gray-200 rounded-lg p-4 bg-white shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <CountryCard
                  key={country.name}
                  country={country}
                  onSelect={handleSelectCountry}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">No countries found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
