import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Simulate routing environment
import SecurityList from "./SecurityList";
import { MockedProvider } from "@apollo/client/testing"; // Mock GraphQL queries
import { GET_SECURITIES } from "../../graphql/queries/getSecurities";

const mockNavigate = jest.fn(); // Mock the navigate function

// Override the useNavigate hook with the mock
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockGetSecurities = jest.fn(() => ({
  data: {
    securities: [
      {
        id: "1",
        ticker: "FB",
        security_name: "Facebook",
        sector: "Technology",
        country: "USA",
        trend: 1.2,
      },
      {
        id: "2",
        ticker: "AAPL",
        security_name: "Apple",
        sector: "Technology",
        country: "USA",
        trend: 1.5,
      },
    ],
  },
}));

const mocks = [
  {
    request: {
      query: GET_SECURITIES,
      variables: { limit: 10, offset: 0 },
    },
    result: mockGetSecurities,
  },
];

describe("SecurityList Component", () => {
  test("renders security list with data", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <SecurityList />
        </MemoryRouter>
      </MockedProvider>
    );

    // Check if loading message is displayed initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockGetSecurities).toHaveBeenCalled();
    });
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();

    // Verify that the security data is rendered
    expect(screen.getByText("Facebook")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  test("navigates to security detail when row is clicked", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <SecurityList />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for the mock data to be rendered
    await waitFor(() => {
      expect(mockGetSecurities).toHaveBeenCalled();
    });
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();

    const fbRow = await screen.findByText("Facebook");

    // Simulate a click on the row
    fireEvent.click(fbRow);

    // Check that navigation occurred
    expect(mockNavigate).toHaveBeenCalledWith("/securities/FB");
  });
});
