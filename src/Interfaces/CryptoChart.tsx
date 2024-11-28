import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Spin, Input } from "antd";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

import { fetchLast30CryptoPrices } from "../Services/CurrencyService";
import {
  CaretDownOutlined,
  CiOutlined,
  DollarCircleOutlined,
  EnterOutlined,
} from "@ant-design/icons";

ChartJS.register(
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export type Crypto = {
  id: string;
  name: string;
  price: number;
  volume: number;
  marketCap: number;
  timestamp: string;
};

type GroupedCryptoData = {
  name: string;
  data: { timestamp: string; value: number }[];
};

const { Title } = Typography;
const { Search } = Input;

const CryptoChart = () => {
  const [cryptoData, setCryptoData] = useState<GroupedCryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const data = await fetchLast30CryptoPrices();
        console.log(data);
        if (Array.isArray(data)) {
          setCryptoData(data);
        } else {
          console.error("Invalid data format received");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (!cryptoData || cryptoData.length === 0) {
    return <div>No data available</div>;
  }

  const filteredCryptoData = cryptoData.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <div style={{ backgroundColor: "#001529", padding: "0 20px" }}>
        <Title level={3} style={{ color: "white", margin: 0 }}>
          Cryptocurrency Dashboard
        </Title>
      </div>

      <Search
        placeholder="Search cryptocurrency by name"
        onSearch={handleSearch}
        allowClear
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          display: "block",
        }}
      />
      {filteredCryptoData.map((crypto) => (
        <Row gutter={[16, 16]}>
          <Col span={20} key={crypto.name}>
            <Card
              title={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {crypto.name === "Bitcoin" && (
                    <CiOutlined style={{ marginRight: 8 }} />
                  )}
                  {crypto.name === "Ethereum" && (
                    <EnterOutlined style={{ marginRight: 8 }} />
                  )}

                  {crypto.name === "USDC" && (
                    <DollarCircleOutlined style={{ marginRight: 8 }} />
                  )}
                  <Title level={4} style={{ margin: 0 }}>
                    {crypto.name}
                  </Title>
                </div>
              }
              extra={<CaretDownOutlined />}
              style={{ width: "100%", marginBottom: 16 }}
            >
              {crypto.data &&
              Array.isArray(crypto.data) &&
              crypto.data.length > 0 &&
              crypto.data.every((entry) => entry.timestamp && entry.value) ? (
                <Line
                  data={{
                    labels: crypto.data.map((entry) =>
                      new Date(entry.timestamp).toISOString()
                    ),
                    datasets: [
                      {
                        label: `${crypto.name} Price (USD)`,
                        data: crypto.data.map((entry) => entry.value),
                        borderColor: "rgba(75,192,192,1)",
                        backgroundColor: "rgba(75,192,192,0.2)",
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: `${crypto.name} Price Over Time`,
                      },
                    },
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Time",
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Price (USD)",
                        },
                      },
                    },
                  }}
                />
              ) : (
                <p>No data available</p>
              )}
            </Card>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default CryptoChart;
