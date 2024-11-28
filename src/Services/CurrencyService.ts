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
