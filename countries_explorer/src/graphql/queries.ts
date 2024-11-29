//This file contains the graphql queries required for the application
import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query GetCountries($name: String) {
    countries(filter: { name: { regex: $name } }) {
      name
      capital
      awsRegion
      emoji
      languages {
        name
      }
      currency
    }
  }
`;
