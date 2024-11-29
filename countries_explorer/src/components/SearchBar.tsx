//This file contains the search bar component that will be used to search for countries
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';

interface SearchBarProps {
  onSearch: (query: string) => void; // Function passed down to handle the search query
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300); // Reduce debounce delay to 300ms

  // Handle input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query); // Update the search query state
  };

  // Trigger the onSearch function passed as a prop when the debounced query changes
  React.useEffect(() => {
    // Pass lowercase version of query to parent to ensure case-insensitive search
    onSearch(debouncedSearchQuery.toLowerCase());
  }, [debouncedSearchQuery, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for a country..."
      />
    </div>
  );
};

export default SearchBar;

