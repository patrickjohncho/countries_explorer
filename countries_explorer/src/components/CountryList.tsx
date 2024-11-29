//This file contains the country list component, where a user is able to select any country
import React from 'react';
import { Country } from '../types/Country';
import CountryCard from './CountryCard.tsx';

interface CountryListProps {
  countries: Country[];
  onSelect: (country: Country) => void;
}

const CountryList: React.FC<CountryListProps> = ({ countries, onSelect }) => {
  return (
    <div>
      {countries.map((country) => (
        <CountryCard key={country.name} country={country} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default CountryList;
