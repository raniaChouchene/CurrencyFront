import React, { useEffect, useState } from "react";
import { Crypto } from "../Types/Currency";
import { fetchMostRecentCryptoData } from "../Services/CurrencyService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

const getCryptoLogo = (name: string) => {
  switch (name.toLowerCase()) {
    case "bitcoin":
      return "https://cryptologos.cc/logos/bitcoin-btc-logo.png";
    case "ethereum":
      return "https://cryptologos.cc/logos/ethereum-eth-logo.png";
    default:
      return "https://cryptologos.cc/logos/cryptocurrency-logo.png";
  }
};

const CryptoList = () => {
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMostRecentCryptoData();
        setCryptoData(data);
      } catch (err) {
        setError("Failed to fetch crypto data");
        console.error("Failed to fetch crypto data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#333",
        minHeight: "100vh",
        width: "100%", // Full width of the page
      }}
    >
      {/* Centered Title */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          width: "100%", // Ensure title is centered on full width
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontFamily: "cursive",
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            width: "100%", // Ensure the title takes full width
          }}
        >
          Most Recent Cryptocurrencies
        </Typography>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="cryptocurrency table" sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Volume</TableCell>
              <TableCell align="right">Market Cap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptoData.map((crypto, index) => (
              <TableRow
                key={crypto.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff", // Alternating row colors
                }}
              >
                <TableCell align="right">{crypto.name}</TableCell>
                <TableCell align="right">${crypto.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  ${crypto.volume.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  ${crypto.marketCap.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CryptoList;
