import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NoPageFound from "./NoPageFound";
import { useNavigate } from "react-router-dom";

const mockNavigate = jest.fn();

// Override the useNavigate hook with the mock
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("NoPageFound Component", () => {
  test("renders the 404 page message", () => {
    render(
      <MemoryRouter>
        <NoPageFound />
      </MemoryRouter>
    );

    // Check if the 404 message is displayed
    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText("The page you are looking for does not exist.")
    ).toBeInTheDocument();

    // Check if the "Go Back to Home" button is present
    const homeButton = screen.getByText("Go Back to Home");
    expect(homeButton).toBeInTheDocument();
  });

  test('navigates to the home page when "Go Back to Home" button is clicked', () => {
    const mockNavigate = useNavigate();

    render(
      <MemoryRouter>
        <NoPageFound />
      </MemoryRouter>
    );

    // Find the "Go Back to Home" button and simulate a click
    const homeButton = screen.getByText("Go Back to Home");
    fireEvent.click(homeButton);

    // Check that the mock navigate function was called with the home path "/"
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
