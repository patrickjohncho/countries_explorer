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
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [languageFilter, setLanguageFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
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
          continent: canada.continent?.name,
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

  const handleRegionFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRegionFilter(event.target.value);
  };

  const handleLanguageFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguageFilter(event.target.value);
  };

  const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as 'asc' | 'desc');
  };

  const countries: Country[] = data?.countries?.map((country: any) => ({
    name: country.name,
    capital: country.capital,
    continent: country.continent?.name,
    emoji: country.emoji,
    languages: country.languages.map((lang: any) => lang.name),
    currency: country.currency,
  })) || [];

  // Dynamically generate unique regions from countries and sort alphabetically
  const uniqueRegions = Array.from(
    new Set(
      countries
        .flatMap((country) => country.continent) // Flatten continent arrays
        .filter((continent) => typeof continent === 'string' && continent.trim() !== '') // Ensure valid strings
    )
  ).sort((a, b) => a.localeCompare(b)); // Sort alphabetically

  // Apply search, filters, and sorting
  const filteredCountries = countries
  .filter((country) => {
    console.log('Filtering Country:', country.name);
    console.log('Country Continent:', country.continent);
    console.log('Region Filter:', regionFilter);

    const matchesSearch = country.name
      .toLowerCase()
      .includes(debouncedSearchQuery.toLowerCase());

    const matchesRegion =
      regionFilter === 'All' ||
      (country.continent &&
        country.continent.trim().toLowerCase() === regionFilter.trim().toLowerCase());
    

    const matchesLanguage =
      languageFilter === 'All' || country.languages.includes(languageFilter);

    console.log('Matches Search:', matchesSearch);
    console.log('Matches Region:', matchesRegion);
    console.log('Matches Language:', matchesLanguage);

    return matchesSearch && matchesRegion && matchesLanguage;
  })
  .sort((a, b) => {
    if (sortOrder === 'asc') return a.name.localeCompare(b.name);
    return b.name.localeCompare(a.name);
  });

  if (loading) return <p className="text-center text-gray-500">Loading countries...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching countries: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Country Details Section */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="ml-8 bg-white shadow-md p-6 sticky top-0 z-10">
          {selectedCountry && (
            <div>
              <h1>Countries Explorer</h1>
              <h2 className="text-3xl font-bold text-blue-600">
                {selectedCountry.name} {selectedCountry.emoji}
              </h2>
              <p className="mt-2"><strong>Capital:</strong> {selectedCountry.capital}</p>
              <p><strong>Region:</strong> {selectedCountry.continent}</p>
              <p><strong>Languages:</strong> {selectedCountry.languages.join(', ')}</p>
              <p><strong>Currency:</strong> {selectedCountry.currency}</p>

              {weather && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Weather in {selectedCountry.capital}</h3>
                  <p><strong>Temperature:</strong> {weather.temperature}°C</p>
                  <p><strong>Condition:</strong> {weather.condition}</p>
                  <img
                    src={weather.icon}
                    alt={weather.condition}
                    className="mt-2 w-16 h-16"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Search Bar and Scrollable Country List */}
      <div className="max-w-4xl mx-auto mt-4 p-4">
        {/* Filters and Sort Options */}
        <div className="mb-4 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for a country..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Region Filter */}
          <select
            value={regionFilter}
            onChange={handleRegionFilterChange}
            className="p-3 border border-gray-300 rounded-lg"
          >
            <option value="All">All Regions</option>
            {uniqueRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          {/* Language Filter */}
          <select
            value={languageFilter}
            onChange={handleLanguageFilterChange}
            className="p-3 border border-gray-300 rounded-lg"
          >
            <option value="All">All Languages</option>
            {Array.from(new Set(countries.flatMap((c) => c.languages))).map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="p-3 border border-gray-300 rounded-lg"
          >
            <option value="asc">Sort: A-Z</option>
            <option value="desc">Sort: Z-A</option>
          </select>
        </div>

        {/* Scrollable List */}
        <div
          style={{
            height: '400px',
            overflowY: 'auto',
          }}
          className="border border-gray-200 rounded-lg p-4 bg-white shadow-md"
        >
          {filteredCountries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCountries.map((country) => (
                <CountryCard
                  key={country.name}
                  country={country}
                  onSelect={handleSelectCountry}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>No countries match your criteria.</p>
              <p>Try adjusting the filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

