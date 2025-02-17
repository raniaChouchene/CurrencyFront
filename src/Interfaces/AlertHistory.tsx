import { useEffect, useState } from "react";
import { Table } from "antd";
import { fetchAlertsHistory } from "../Services/CurrencyService";
import {
  UpCircleOutlined,
  DownCircleOutlined,
  GoldOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

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
        const response = await fetchAlertsHistory();
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

  const columns = [
    {
      title: (
        <span style={{ color: "#1890ff" }}>
          <GoldOutlined style={{ marginRight: 8 }} />
          Cryptocurrency
        </span>
      ),
      dataIndex: "cryptoId",
      key: "cryptoId",
      render: (cryptoId: { name: string }) => cryptoId.name,
    },
    {
      title: (
        <span style={{ color: "#fa541c" }}>
          <UpCircleOutlined style={{ marginRight: 8 }} />
          Threshold
        </span>
      ),
      dataIndex: "threshold",
      key: "threshold",
      render: (threshold: number) => `$${threshold}`,
    },
    {
      title: (
        <span style={{ color: "#52c41a" }}>
          <DownCircleOutlined style={{ marginRight: 8 }} />
          Threshold Type
        </span>
      ),
      dataIndex: "thresholdType",
      key: "thresholdType",
    },
  ];

  return (
    <div>
      <h2
        style={{ color: " #233067", fontWeight: "bold", textAlign: "center" }}
      >
        <HistoryOutlined style={{ marginRight: 8 }} />
        Your Alert History
      </h2>
      <Table
        columns={columns}
        dataSource={alerts}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default AlertHistory;
