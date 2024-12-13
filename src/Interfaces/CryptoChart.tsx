import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Spin, Input, Button } from "antd";
import {
  CaretDownOutlined,
  CiOutlined,
  DollarCircleOutlined,
  EnterOutlined,
} from "@ant-design/icons";
import {
  fetchLast30CryptoPrices,
  fetchHistoricalCryptoData,
} from "../Services/CurrencyService";
import ChartModal from "./ChartModal";
import { Line } from "react-chartjs-2";

const { Title } = Typography;
const { Search } = Input;

type GroupedCryptoData = {
  name: string;
  data: { timestamp: string; value: number }[];
};

const CryptoChart = () => {
  const [cryptoData, setCryptoData] = useState<GroupedCryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("month");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCryptoData, setCurrentCryptoData] = useState<
    { timestamp: string; value: number }[] | null
  >(null);
  const [currentCryptoName, setCurrentCryptoName] = useState("");

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
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  const handlePeriodChange = async (cryptoName: string, period: string) => {
    setLoading(true);
    setSelectedPeriod(period);

    try {
      const data = await fetchHistoricalCryptoData(cryptoName, period);
      console.log(data);
      if (Array.isArray(data) && data.length > 0) {
        const limitedData = data.slice(0, 30);
        setCurrentCryptoData(limitedData);
        setCurrentCryptoName(cryptoName);
        setModalVisible(true);
      } else {
        console.error("Invalid or empty data received");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching historical crypto data:", error);
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    console.log("Closing modal...");
    setModalVisible(false);
    setCurrentCryptoData(null);
    setCurrentCryptoName("");
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
        <Row gutter={[16, 16]} key={crypto.name}>
          <Col span={20}>
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
              crypto.data.length > 0 ? (
                <Line
                  data={{
                    labels: crypto.data.map((entry) =>
                      new Date(entry.timestamp).toLocaleDateString()
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
              <div style={{ marginTop: 16, textAlign: "center" }}>
                <Button
                  type={selectedPeriod === "month" ? "primary" : "default"}
                  onClick={() => handlePeriodChange(crypto.name, "month")}
                  style={{ marginRight: 8 }}
                >
                  Last Month
                </Button>
                <Button
                  type={selectedPeriod === "year" ? "primary" : "default"}
                  onClick={() => handlePeriodChange(crypto.name, "year")}
                >
                  Last Year
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      ))}

      <ChartModal
        visible={modalVisible}
        onClose={handleModalClose}
        cryptoData={currentCryptoData || []}
        cryptoName={currentCryptoName}
      />
    </>
  );
};

export default CryptoChart;
