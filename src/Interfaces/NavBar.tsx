import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  LoginOutlined,
  LineChartOutlined,
  LogoutOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Sider
      width={250}
      style={{
        background: `url('https://m.foolcdn.com/media/dubs/images/original_imagesoriginal_imageshttpsg.foolcdn.c.width-880_SfbkM9V.jpg') repeat-y center top`, // Repeat image vertically
        backgroundSize: "cover",
        color: "#fff",
      }}
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
          marginTop: "50px",
        }}
      >
        <img
          src="https://m.foolcdn.com/media/dubs/images/original_imagesoriginal_imageshttpsg.foolcdn.c.width-880_SfbkM9V.jpg"
          alt="Cryptocurrency Image"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          onClick={() => navigate("/")}
        />
      </div>
      <div
        style={{
          height: "1px",
          backgroundColor: "#ccc",
          margin: "0 24px",
        }}
        onClick={() => navigate("/")}
      />

      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          borderRight: 0,
          display: "block",
        }}
      >
        {!isLoggedIn && (
          <Menu.Item
            key="login"
            icon={<LoginOutlined style={{ color: "#fff" }} />}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          >
            <Link to="/login" style={{ color: "#fff" }}>
              Log In / Sign Up
            </Link>
          </Menu.Item>
        )}
        {isLoggedIn && (
          <Menu.Item
            key="History"
            icon={<HistoryOutlined style={{ color: "#fff" }} />}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          >
            <Link to="/AlertHistory" style={{ color: "#fff" }}>
              Alert History
            </Link>
          </Menu.Item>
        )}

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

        {isLoggedIn && (
          <Menu.Item
            key="LogOut"
            icon={<LogoutOutlined style={{ color: "#fff" }} />}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              position: "absolute",
              bottom: "20px",
              width: "100%",
              color: "#fff",
            }}
            onClick={handleLogOut}
          >
            Log Out
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
};

export default NavBar;
