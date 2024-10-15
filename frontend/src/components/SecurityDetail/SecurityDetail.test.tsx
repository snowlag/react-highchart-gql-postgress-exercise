import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import SecurityDetail from "./SecurityDetail";
import { GET_SECURITY_DETAIL } from "../../graphql/queries/getSecurityDetails";

const mockGetSecurityDetail = jest.fn(() => ({
  data: {
    security: {
      ticker: "FB",
      security_name: "Facebook",
      sector: "Technology",
      country: "USA",
      prices: [{ date: "2022-01-01", close: "150.00", volume: "10000" }],
    },
  },
}));
const mocks = [
  {
    request: {
      query: GET_SECURITY_DETAIL,
      variables: { ticker: "FB" },
    },
    result: mockGetSecurityDetail,
  },
];

describe("SecurityDetail Component", () => {
  test("renders security detail for given ticker", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/securities/FB"]}>
          <Routes>
            <Route path="/securities/:ticker" element={<SecurityDetail />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    // Check if loading message is displayed initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for the data to load and check if security details are displayed
    await waitFor(() => {
      expect(mockGetSecurityDetail).toHaveBeenCalled();
    });
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    const securityName = await screen.findByText("FB - Facebook");
    expect(securityName).toBeInTheDocument();
    expect(screen.getByText("Sector: Technology")).toBeInTheDocument();
    expect(screen.getByText("Country: USA")).toBeInTheDocument();
  });
});
