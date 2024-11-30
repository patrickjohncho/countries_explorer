import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_COUNTRIES } from './graphql/queries';
import App from './App';

// Mock country data
const mockCountries = {
  countries: [
    {
      name: 'Canada',
      capital: 'Ottawa',
      continent: { name: 'North America' },
      emoji: '🇨🇦',
      languages: [{ name: 'English' }],
      currency: 'CAD',
    },
    {
      name: 'China',
      capital: 'Beijing',
      continent: { name: 'Asia' },
      emoji: '🇨🇳',
      languages: [{ name: 'Chinese' }],
      currency: 'CNY',
    },
  ],
};

// Mock GraphQL queries
const mocks = [
  {
    request: {
      query: GET_COUNTRIES,
      variables: { name: '' },
    },
    result: {
      data: mockCountries,
    },
  },
];

describe('App Component', () => {
  it('renders loading state initially', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    expect(screen.getByText(/Loading countries.../i)).toBeInTheDocument();
  });

  it('displays countries after data is fetched', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    await waitFor(() => screen.getByText(/Canada/i));
    expect(screen.getByText(/Canada/i)).toBeInTheDocument();
    expect(screen.getByText(/China/i)).toBeInTheDocument();
  });

  it('allows filtering by search query', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    await waitFor(() => screen.getByText(/Canada/i));
    const searchInput = screen.getByPlaceholderText(/Search for a country.../i);

    fireEvent.change(searchInput, { target: { value: 'Canada' } });
    expect(screen.getByText(/Canada/i)).toBeInTheDocument();
    expect(screen.queryByText(/China/i)).not.toBeInTheDocument();
  });

  it('displays selected country details', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    await waitFor(() => screen.getByText(/Canada/i));
    fireEvent.click(screen.getByText(/Canada/i));

    await waitFor(() => screen.getByText(/Capital:/i)); // Ensure details render
    expect(screen.getByText(/Capital:/i)).toHaveTextContent('Ottawa');
    expect(screen.getByText(/Region:/i)).toHaveTextContent('North America');
    expect(screen.getByText(/Languages:/i)).toHaveTextContent('English');
    expect(screen.getByText(/Currency:/i)).toHaveTextContent('CAD');
  });

  it('handles empty search results gracefully', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    await waitFor(() => screen.getByText(/Canada/i));
    const searchInput = screen.getByPlaceholderText(/Search for a country.../i);

    fireEvent.change(searchInput, { target: { value: 'Unknown Country' } });

    expect(screen.getByText(/No countries match your criteria./i)).toBeInTheDocument();
  });

  it('handles GraphQL errors gracefully', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_COUNTRIES,
          variables: { name: '' },
        },
        error: new Error('GraphQL error'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    await waitFor(() => screen.getByText(/Error fetching countries:/i));
    expect(screen.getByText(/Error fetching countries:/i)).toBeInTheDocument();
  });
});
