import { vi, describe, test, beforeEach, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AlertHistory from "../Interfaces/AlertHistory";
import { fetchAlertsHistory } from "../Services/CurrencyService";

vi.mock("../Services/CurrencyService", () => ({
  fetchAlertsHistory: vi.fn(),
}));

describe("AlertHistory", () => {
  const mockAlerts = [
    {
      _id: "1",
      cryptoId: { name: "Bitcoin" },
      threshold: 50000,
      thresholdType: "above",
    },
    {
      _id: "2",
      cryptoId: { name: "Ethereum" },
      threshold: 3000,
      thresholdType: "below",
    },
  ];

  beforeEach(() => {
    vi.mocked(fetchAlertsHistory).mockResolvedValue(mockAlerts);
  });

  test("renders loading state initially", () => {
    render(<AlertHistory />);
    const loadingText = screen.getByText(/Loading.../);
    expect(loadingText).toBeInTheDocument();
  });

  test("renders error message if fetch fails", async () => {
    vi.mocked(fetchAlertsHistory).mockRejectedValue(
      new Error("Failed to fetch alert history")
    );
    render(<AlertHistory />);

    const errorMessage = await screen.findByText(
      /Failed to fetch alert history/
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("handles empty alert history gracefully", async () => {
    vi.mocked(fetchAlertsHistory).mockResolvedValue([]);
    render(<AlertHistory />);
  });
});
