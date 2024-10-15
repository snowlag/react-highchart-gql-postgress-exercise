import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";

const mockNavigate = jest.fn(); // Mock the navigate function

// Override the useNavigate hook with the mock
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Header Component", () => {
  test('renders "Securities" when on the security list page', () => {
    render(
      <MemoryRouter initialEntries={["/security"]}>
        <Header />
      </MemoryRouter>
    );

    // Check if the title is "Securities"
    expect(screen.getByText("Securities")).toBeInTheDocument();

    // The "All Securities" button should not be present
    expect(screen.queryByText("All Securities")).not.toBeInTheDocument();
  });

  test('renders "Security Details" and "All Securities" button when on a security details page', () => {
    render(
      <MemoryRouter initialEntries={["/securities/FB"]}>
        <Header />
      </MemoryRouter>
    );

    // Check if the title is "Security Details"
    expect(screen.getByText("Security Details")).toBeInTheDocument();

    // The "All Securities" button should be present
    const allSecuritiesButton = screen.getByText("All Securities");
    expect(allSecuritiesButton).toBeInTheDocument();
  });

  test('navigates to securities list when "All Securities" button is clicked', () => {
    render(
      <MemoryRouter initialEntries={["/securities/FB"]}>
        <Header />
      </MemoryRouter>
    );

    // Find the "All Securities" button
    const allSecuritiesButton = screen.getByText("All Securities");
    fireEvent.click(allSecuritiesButton); // Simulate a click

    // Check if the mockNavigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
