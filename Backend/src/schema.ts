import { gql } from "apollo-server";

export const typeDefs = gql`
  type Price {
    date: String
    close: String
    volume: String
  }

  type Security {
    id: ID
    ticker: String
    security_name: String
    sector: String
    country: String
    trend: Float
    prices: [Price]
  }

  type Query {
    securities(limit: Int, offset: Int): [Security]
    security(ticker: String!): Security
  }
`;
