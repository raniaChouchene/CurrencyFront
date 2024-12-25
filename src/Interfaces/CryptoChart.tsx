import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Spin, Input, Button } from "antd";
import {
  CaretDownOutlined,
  CiOutlined,
  DashboardOutlined,
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
  const [searchTerm, setSearchTerm] = useState(""); // Store search term
  const [selectedPeriod, setSelectedPeriod] = useState<"month" | "week">(
    "month"
  );

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
          setCryptoData(data); // Set data to state
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

  const handlePeriodChange = async (
    cryptoName: string,
    period: "month" | "week"
  ) => {
    setLoading(true);
    setSelectedPeriod(period);

    try {
      const data = await fetchHistoricalCryptoData(cryptoName, period);
      console.log(data);
      if (Array.isArray(data) && data.length > 0) {
        const limitedData = period === "month" ? data.slice(0, 30) : data;
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

  // Filter the data dynamically based on the search term
  const filteredCryptoData = cryptoData.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm)
  );

  // Function to group data into pairs
  const pairCryptoData = (data: GroupedCryptoData[]) => {
    const pairedData: GroupedCryptoData[][] = [];
    for (let i = 0; i < data.length; i += 2) {
      pairedData.push([data[i], data[i + 1]]);
    }
    return pairedData;
  };

  const pairedCryptoData = pairCryptoData(filteredCryptoData);

  return (
    <>
      <div
        style={{
          backgroundColor: "#001529",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <DashboardOutlined
            style={{ fontSize: "24px", color: "white", marginRight: "12px" }}
          />
          <Title level={3} style={{ color: "white", margin: 0 }}>
            Cryptocurrency Dashboard
          </Title>
        </div>
      </div>

      <Search
        placeholder="Search cryptocurrency by name"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        allowClear
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          display: "block",
        }}
      />

      {filteredCryptoData.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <p>No cryptocurrencies found matching your search term</p>
        </div>
      ) : (
        pairedCryptoData.map((pair, index) => (
          <Row gutter={[16, 16]} key={index}>
            {pair.map((crypto) => {
              // Ensure crypto object is valid before accessing properties
              if (!crypto || !crypto.name || !crypto.data) {
                console.error("Invalid crypto data:", crypto);
                return null;
              }

              return (
                <Col span={12} key={crypto.name}>
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
                        height={200}
                      />
                    ) : (
                      <p>No data available</p>
                    )}
                    <div style={{ marginTop: 16, textAlign: "center" }}>
                      <Button
                        type={
                          selectedPeriod === "month" ? "primary" : "default"
                        }
                        onClick={() => handlePeriodChange(crypto.name, "month")}
                        style={{ marginRight: 8 }}
                      >
                        Last Month
                      </Button>
                      <Button
                        type={selectedPeriod === "week" ? "primary" : "default"}
                        onClick={() => handlePeriodChange(crypto.name, "week")}
                      >
                        Last week
                      </Button>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ))
      )}

      <ChartModal
        visible={modalVisible}
        onClose={handleModalClose}
        cryptoData={currentCryptoData || []}
        cryptoName={currentCryptoName}
        timeframe={selectedPeriod}
      />
    </>
  );
};

export default CryptoChart;
