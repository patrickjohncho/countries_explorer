//This file contains the configuration for the apollo client that will be used to retrieve the country data
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/', //CountriesGraphQL API endpoint
  cache: new InMemoryCache(), //Cache data to minimize API calls
});

export default client;
