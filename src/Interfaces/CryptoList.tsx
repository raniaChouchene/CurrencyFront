import { useEffect, useState } from "react";
import { Crypto } from "../Types/Currency";
import {
  fetchMostRecentCryptoData,
  handleSetAlerts,
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
  TextField as MuiTextField,
  Select,
  MenuItem,
} from "@mui/material";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

const CryptoList = () => {
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  const [filteredCryptoData, setFilteredCryptoData] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const [threshold, setThreshold] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [thresholdType, setThresholdType] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMostRecentCryptoData();
        console.log(data);
        setCryptoData(data);
        setFilteredCryptoData(data);
      } catch (err) {
        setError("Failed to fetch crypto data");
        console.error("Failed to fetch crypto data", err);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

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
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setThreshold("");
    setSelectedCrypto(null);
  };

  const handleSetAlert = () => {
    if (selectedCrypto && threshold && thresholdType) {
      try {
        handleSetAlerts(selectedCrypto.id, Number(threshold), thresholdType);
      } catch (error) {
        console.error("Error setting alert:", error);
      }
      console.log(
        `Alert configured for ${selectedCrypto.name} at price: ${threshold} ant type: ${thresholdType}`
      );

      handleCloseDialog();
    }
  };

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
        height: "100%",
        boxSizing: "border-box",
        alignContent: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontFamily: "cursive",
            color: "#2e4053",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "20px",
            width: "100%",
          }}
        >
          <CurrencyBitcoinIcon
            sx={{
              fontSize: "40px",
              color: "#2e4053",
              marginRight: "8px",
            }}
          />
          Most Recent Cryptocurrencies
        </Typography>

        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            maxWidth: "400px",
            width: "100%",
            marginBottom: "20px",
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="cryptocurrency table" sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Volume</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              {isLoggedIn && <TableCell align="right">Actions</TableCell>}{" "}
              {/* Only show if logged in */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCryptoData.map((crypto, index) => (
              <TableRow
                key={crypto.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
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
                <TableCell align="right">
                  {isLoggedIn && (
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#2e4053", color: "white" }}
                      onClick={() => handleOpenDialog(crypto)}
                    >
                      Set Alert
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Set Price Alert</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Set an alert for {selectedCrypto?.name}. You will be notified when
            the price falls below your threshold.
          </DialogContentText>
          <Select
            defaultValue="Above"
            value={thresholdType}
            onChange={(e) => setThresholdType(e.target.value)}
          >
            <MenuItem value="below">Below</MenuItem>
            <MenuItem value="above">Above</MenuItem>
          </Select>
          <MuiTextField
            autoFocus
            margin="dense"
            label="Price Threshold (USD)"
            type="number"
            fullWidth
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSetAlert}
            style={{ backgroundColor: "#2e4053", color: "white" }}
            disabled={!isLoggedIn}
          >
            Set Alert
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CryptoList;
