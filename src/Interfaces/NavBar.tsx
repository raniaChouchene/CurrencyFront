import { Drawer, Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  LoginOutlined,
  AppstoreAddOutlined,
  LineChartOutlined, // Currency chart icon
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
        background: `url('https://m.foolcdn.com/media/dubs/images/original_imagesoriginal_imageshttpsg.foolcdn.c.width-880_SfbkM9V.jpg') no-repeat center center`,
        backgroundSize: "cover",
        color: "#fff", // White text for contrast
        left: 0,
        top: 0,
        overflowY: "auto",
        position: "fixed",
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
          height: "64px",
          cursor: "pointer",
          transition: "background-color 0.3s",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background for logo area
        }}
      >
        <img
          src="https://m.foolcdn.com/media/dubs/images/original_imagesoriginal_imageshttpsg.foolcdn.c.width-880_SfbkM9V.jpg"
          alt="Cryptocurrency Image"
          style={{ width: "100%", opacity: 0.5 }}
        />
      </div>
      <div
        style={{ height: "1px", backgroundColor: "#ccc", margin: "0 24px" }}
      />

      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background for menu
          color: "#fff", // White text
          borderRight: 0,
          display: hovered ? "block" : "none",
        }}
      >
        <Menu.Item
          key="login"
          icon={<LoginOutlined style={{ color: "#fff" }} />} // Light color for icon
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark background for menu item
          }}
        >
          <Link to="/login" style={{ color: "#fff" }}>
            Log In
          </Link>
        </Menu.Item>

        <Menu.Item
          key="createAccount"
          icon={<AppstoreAddOutlined style={{ color: "#fff" }} />} // Light color for icon
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark background for menu item
          }}
        >
          <Link to="/createAccount" style={{ color: "#fff" }}>
            Create Account
          </Link>
        </Menu.Item>

        <Menu.Item
          key="currencyChart"
          icon={<LineChartOutlined style={{ color: "#fff" }} />} // Light color for icon
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark background for menu item
          }}
        >
          <Link to="/currencyChart" style={{ color: "#fff" }}>
            Currency Chart
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default NavBar;
