//This file contains the country card component, which will be used to display the additional information when searching
import React from 'react';
import { Country } from '../types/Country';

interface CountryCardProps {
  country: Country;
  onSelect: (country: Country) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onSelect }) => {
   console.log('CountryCard Rendered:', country);
  return (
    <div onClick={() => onSelect(country)} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{country.name} {country.emoji}</h3>
      <p>Capital: {country.capital}</p>
      <p>Region: {country.region}</p>
    </div>
  );
};

export default CountryCard;
