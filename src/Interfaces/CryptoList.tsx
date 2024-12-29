import { useEffect, useState } from "react";
import { Crypto } from "../Types/Currency";
import {
  fetchMostRecentCryptoData,
  handleSetAlerts,
  forecastCryptoPrices,
} from "../Services/CurrencyService";
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
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
} from "@mui/material";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CryptoList = () => {
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  const [filteredCryptoData, setFilteredCryptoData] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const [threshold, setThreshold] = useState<string>("");
  const [thresholdType, setThresholdType] = useState<string>("above");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [forecastResult, setForecastResult] = useState<{
    historicalData: { date: string; price: number }[];
    forecastedValues: { date: string; price: number }[];
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMostRecentCryptoData();
        setCryptoData(data);
        setFilteredCryptoData(data);
      } catch (err) {
        setError("Failed to fetch crypto data");
        console.error("Error fetching crypto data:", err);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = cryptoData.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCryptoData(filteredData);
  }, [searchQuery, cryptoData]);

  const handleOpenDialog = (crypto: Crypto) => {
    setSelectedCrypto(crypto);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setThreshold("");
    setSelectedCrypto(null);
  };

  const handleSetAlert = () => {
    if (selectedCrypto && threshold) {
      try {
        handleSetAlerts(selectedCrypto.id, Number(threshold), thresholdType);
        console.log(
          `Alert set for ${selectedCrypto.name} at ${thresholdType} ${threshold}`
        );
      } catch (err) {
        console.error("Error setting alert:", err);
      }
      handleCloseDialog();
    }
  };

  const handleForecast = async (crypto: Crypto) => {
    setSelectedCrypto(crypto);
    try {
      const forecast = await forecastCryptoPrices({
        currencyName: crypto.name,
      });
      setForecastResult(forecast);
      console.log("Forecast result:", forecast);
    } catch (err) {
      console.error("Error forecasting prices:", err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  const chartData: ChartData<"line"> = {
    labels: [
      ...(forecastResult?.forecastedValues.map((data) => data.date) || []),
    ],
    datasets: [
      {
        label: "Forecasted Data",
        data: forecastResult?.forecastedValues.map((data) => data.price) || [],
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
      },
    ],
  };

  return (
    <Box p={3}>
      <Box mb={3} textAlign="center">
        <Typography variant="h4" gutterBottom>
          <CurrencyBitcoinIcon fontSize="large" /> Most Recent Cryptocurrencies
        </Typography>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          sx={{ maxWidth: 400, mx: "auto" }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Volume</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              {isLoggedIn && <TableCell align="right">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCryptoData.map((crypto, index) => (
              <TableRow
                key={crypto.id}
                sx={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}
              >
                <TableCell align="left">{crypto.name}</TableCell>
                <TableCell align="right">${crypto.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  ${crypto.volume.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  ${crypto.marketCap.toLocaleString()}
                </TableCell>
                {isLoggedIn && (
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => handleOpenDialog(crypto)}
                    >
                      Set Alert
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ ml: 1 }}
                      onClick={() => handleForecast(crypto)}
                    >
                      Forecast
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Alert Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Set Price Alert</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Set an alert for {selectedCrypto?.name} when the price is{" "}
            <b>{thresholdType}</b> the specified threshold.
          </DialogContentText>
          <Select
            value={thresholdType}
            onChange={(e) => setThresholdType(e.target.value)}
            fullWidth
          >
            <MenuItem value="below">Below</MenuItem>
            <MenuItem value="above">Above</MenuItem>
          </Select>
          <TextField
            type="number"
            label="Threshold (USD)"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSetAlert}
            variant="contained"
            disabled={!isLoggedIn}
          >
            Set Alert
          </Button>
        </DialogActions>
      </Dialog>

      {forecastResult && (
        <Dialog
          open={!!forecastResult}
          onClose={() => setForecastResult(null)}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle>Forecast for {selectedCrypto?.name}</DialogTitle>
          <DialogContent>
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: true,
                    text: `Price Forecast: ${selectedCrypto?.name}`,
                  },
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setForecastResult(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default CryptoList;
