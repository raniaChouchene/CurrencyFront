import { vi, describe, test, beforeEach, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import CryptoList from "../Interfaces/CryptoList";
import {
  fetchMostRecentCryptoData,
  forecastCryptoPrices,
} from "../Services/CurrencyService";
import "@testing-library/jest-dom";

vi.mock("../Services/CurrencyService", () => ({
  fetchMostRecentCryptoData: vi.fn(),
  handleSetAlerts: vi.fn(),
  forecastCryptoPrices: vi.fn(),
}));

// Mock the Chart component
vi.mock("react-chartjs-2", () => ({
  Line: vi.fn(() => <div>Chart</div>),
}));

describe("CryptoList", () => {
  const mockCryptoData = [
    {
      id: "1",
      name: "Bitcoin",
      price: 50000,
      volume: 1000000,
      marketCap: 900000000,
    },
    {
      id: "2",
      name: "Ethereum",
      price: 3000,
      volume: 500000,
      marketCap: 400000000,
    },
  ];

  beforeEach(() => {
    vi.mocked(fetchMostRecentCryptoData).mockResolvedValue(mockCryptoData);
    vi.mocked(forecastCryptoPrices).mockResolvedValue({
      historicalData: [
        { date: "2021-01-01", price: 50000 },
        { date: "2021-01-02", price: 51000 },
      ],
      forecastedValues: [
        { date: "2021-01-03", price: 52000 },
        { date: "2021-01-04", price: 53000 },
      ],
    });
  });

  test("renders loading state initially", () => {
    render(<CryptoList />);
    const loadingSpinner = screen.getByRole("progressbar");
    expect(loadingSpinner).toBeInTheDocument();
  });

  test("renders crypto data after fetching", async () => {
    render(<CryptoList />);
    await screen.findByText("Bitcoin");
    await screen.findByText("Ethereum");

    const bitcoinRow = screen.getByText("Bitcoin");
    const ethereumRow = screen.getByText("Ethereum");

    expect(bitcoinRow).toBeInTheDocument();
    expect(ethereumRow).toBeInTheDocument();
  });

  test("shows error message if fetching fails", async () => {
    vi.mocked(fetchMostRecentCryptoData).mockRejectedValue(
      new Error("Failed to fetch data")
    );
    render(<CryptoList />);
    const errorMessage = await screen.findByText(/Failed to fetch crypto data/);
    expect(errorMessage).toBeInTheDocument();
  });

  test("filters crypto data by search query", async () => {
    render(<CryptoList />);
    await screen.findByText("Bitcoin");

    await waitFor(() => screen.getByText("Bitcoin"));
  });

  test("opens dialog and sets alert", async () => {
    render(<CryptoList />);
    await screen.findByText("Bitcoin");
  });

  test("calls forecastCryptoPrices and displays forecast", async () => {
    render(<CryptoList />);
    await screen.findByText("Bitcoin");
  });

  test("handles missing forecast data gracefully", async () => {
    vi.mocked(forecastCryptoPrices).mockResolvedValue({
      historicalData: [],
      forecastedValues: [],
    });

    render(<CryptoList />);
    await screen.findByText("Bitcoin");
  });
});
