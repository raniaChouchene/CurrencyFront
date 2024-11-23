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
