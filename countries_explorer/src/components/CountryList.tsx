//This file contains the country list component, where a user is able to select any country
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../graphql/queries';
import { Country } from '../types/Country';
import CountryCard from './CountryCard';

interface CountryListProps {
  searchQuery: string;
  onSelect: (country: Country) => void;
}

const CountryList: React.FC<CountryListProps> = ({ searchQuery, onSelect }) => {
  const { loading, error, data } = useQuery(GET_COUNTRIES, {
    variables: { name: searchQuery || '' },
  });

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Error fetching countries: {error.message}</p>;

  const countries: Country[] = data.countries.map((country: any) => ({
    name: country.name,
    capital: country.capital,
    region: country.region,
    population: country.population,
    area: country.area,
    flag: country.flag,
    languages: country.languages.map((lang: any) => lang.name),
    currencies: country.currencies.map((curr: any) => curr.name),
    neighboringCountries: country.borders.map((border: any) => border.name),
    timezones: country.timezones,
  }));

  return (
    <div>
      {countries.map((country) => (
        <CountryCard key={country.name} country={country} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default CountryList;
