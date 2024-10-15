import { gql } from "@apollo/client";

export const GET_SECURITY_DETAIL = gql`
  query GetSecurityDetail($ticker: String!) {
    security(ticker: $ticker) {
      ticker
      security_name
      sector
      country
      prices {
        date
        close
        volume
      }
    }
  }
`;
