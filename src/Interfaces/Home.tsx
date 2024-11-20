import React from "react";
import { Layout, Row, Col, Button, Typography, Card } from "antd";
import {
  FundOutlined,
  AreaChartOutlined,
  WalletOutlined,
  BellOutlined,
} from "@ant-design/icons";
import "./Home.css";

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const services = [
  {
    title: "Real-Time Cryptocurrency Prices",
    description:
      "Stay updated with live cryptocurrency prices and changes. Make informed investment decisions with precise data.",
    icon: <FundOutlined />,
  },
  {
    title: "Market Analysis",
    description:
      "Get insights into market trends with detailed charts and analytics. Monitor market movements effectively.",
    icon: <AreaChartOutlined />,
  },
  {
    title: "Portfolio Management",
    description:
      "Organize and track your cryptocurrency holdings in one place. Analyze your investments with ease.",
    icon: <WalletOutlined />,
  },
  {
    title: "Custom Alerts & Notifications",
    description:
      "Set personalized alerts for price changes, market trends, or specific cryptocurrency updates.",
    icon: <BellOutlined />,
  },
];

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <Content className="content">
        <div className="hero">
          <Row justify="center" align="middle">
            <Col span={12}>
              <Title level={1} className="hero-title">
                Welcome to CryptoTracker
              </Title>
              <Paragraph className="hero-text">
                Your one-stop platform for cryptocurrency tracking, market
                analysis, and portfolio management. Empowering your investments
                with cutting-edge tools and real-time updates.
              </Paragraph>
              <Button type="primary" size="large" className="cta-button">
                Start Tracking Now
              </Button>
            </Col>
          </Row>
        </div>

        {/* Services Section */}
        <div className="services">
          <Row gutter={[16, 16]} justify="start" style={{ marginTop: "20px" }}>
            {services.map((service, index) => (
              <Col key={index} xs={24} sm={24} md={12} lg={8}>
                <Card
                  title={
                    <div className="card-title">
                      <span className="card-icon">{service.icon}</span>
                      {service.title}
                    </div>
                  }
                  bordered={false}
                  className="service-card"
                  bodyStyle={{ padding: "16px", backgroundColor: "#f7f7f7" }}
                  style={{
                    borderRadius: "20px", // Make edges more rounded
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    marginTop: "16px",
                    maxWidth: "350px", // Adjust width of the cards
                    marginLeft: "auto", // Align cards to the right
                    marginRight: "0", // Remove any additional margin on the right
                  }}
                >
                  <p>{service.description}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>

      <Footer className="footer"></Footer>
    </Layout>
  );
};

export default Home;
