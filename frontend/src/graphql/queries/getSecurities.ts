import { gql } from "@apollo/client";

export const GET_SECURITIES = gql`
  query GetSecurities($limit: Int!, $offset: Int!) {
    securities(limit: $limit, offset: $offset) {
      ticker
      security_name
      sector
      country
      trend
    }
  }
`;
