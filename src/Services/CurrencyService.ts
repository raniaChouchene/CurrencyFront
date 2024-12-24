import axios from "axios";
import { endpoint } from "../constants";

export const fetchMostRecentCryptoData = async () => {
  try {
    const response = await axios.get(
      `${endpoint}/cryptocurrencies/most-recent`
    );
    return response.data;
  } catch (error) {
    console.error("error fetching the list of the recent currency ");
  }
};
export const fetchLast30CryptoPrices = async () => {
  try {
    const response = await axios.get(
      `${endpoint}/cryptocurrencies/crypto-prices`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching the last 30 crypto prices and times :",
      error
    );
    throw error;
  }
};

export const fetchHistoricalCryptoData = async (
  currencyName: string,
  period: string
) => {
  try {
    const response = await axios.get(
      `${endpoint}/cryptocurrencies/historical-data`,
      {
        params: {
          currencyName: currencyName,
          period: period,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching historical crypto data:", error);
    throw error;
  }
};
export const handleSetAlerts = async (
  selectedCryptoId: string,
  threshold: number,
  thresholdType: string
) => {
  try {
    const response = await axios.post(`${endpoint}/cryptocurrencies/alerts`, {
      cryptoId: selectedCryptoId,
      threshold,
      thresholdType,
    });
    alert("Alert set successfully!");
  } catch (error) {
    console.error("Error setting alert:", error);
    alert("Failed to set alert");
  }
};
