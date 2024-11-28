import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  LoginOutlined,
  AppstoreAddOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Sider } = Layout;

const NavBar = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Sider
      width={hovered ? 250 : 70}
      style={{
        background: `url('https://m.foolcdn.com/media/dubs/images/original_imagesoriginal_imageshttpsg.foolcdn.c.width-880_SfbkM9V.jpg') repeat-y center top`, // Repeat image vertically
        backgroundSize: "cover",
        color: "#fff",

        left: 0,
        top: 0,
        overflowY: "auto",
        height: "100vh",
        zIndex: 1000,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `rgba(0, 0, 0, 0.5)`,
          height: "64px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
      >
        <img
          src="https://m.foolcdn.com/media/dubs/images/original_imagesoriginal_imageshttpsg.foolcdn.c.width-880_SfbkM9V.jpg"
          alt="Cryptocurrency Image"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      </div>
      <div
        style={{
          height: "1px",
          backgroundColor: "#ccc",
          margin: "0 24px",
        }}
      />

      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          borderRight: 0,
          display: hovered ? "block" : "none",
        }}
      >
        <Menu.Item
          key="login"
          icon={<LoginOutlined style={{ color: "#fff" }} />}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <Link to="/login" style={{ color: "#fff" }}>
            Log In
          </Link>
        </Menu.Item>

        <Menu.Item
          key="createAccount"
          icon={<AppstoreAddOutlined style={{ color: "#fff" }} />}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <Link to="/register" style={{ color: "#fff" }}>
            Create Account
          </Link>
        </Menu.Item>

        <Menu.Item
          key="currencyList"
          icon={<LineChartOutlined style={{ color: "#fff" }} />}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <Link to="/CryptoList" style={{ color: "#fff" }}>
            Currency List
          </Link>
        </Menu.Item>

        <Menu.Item
          key="currencyChart"
          icon={<LineChartOutlined style={{ color: "#fff" }} />}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <Link to="/cryptoCharts" style={{ color: "#fff" }}>
            Currency Chart
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default NavBar;
