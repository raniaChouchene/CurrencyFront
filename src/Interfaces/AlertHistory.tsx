import { useEffect, useState } from "react";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

interface Alert {
  _id: string;
  cryptoId: { name: string };
  threshold: number;
  thresholdType: string;
}

const AlertHistory = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlertHistory = async () => {
      try {
        const response = fetchAlertHistory();
        //@ts-expect-error
        setAlerts(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching alert history:", error);
        setError("Failed to fetch alert history");
        setLoading(false);
      }
    };

    fetchAlertHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Your Alert History</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cryptocurrency</TableCell>
            <TableCell>Threshold</TableCell>
            <TableCell>Threshold Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow key={alert._id}>
              <TableCell>{alert.cryptoId.name}</TableCell>
              <TableCell>${alert.threshold}</TableCell>
              <TableCell>{alert.thresholdType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AlertHistory;
