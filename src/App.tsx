import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./Interfaces/NavBar";
import Login from "./Interfaces/User/LogIn";
import Home from "./Interfaces/Home";
import CryptoList from "./Interfaces/CryptoList";
import { Layout } from "antd";
import CreateAccount from "./Interfaces/User/CreateAccount";
import CryptoChart from "./Interfaces/CryptoChart";
import AlertHistory from "./Interfaces/AlertHistory";

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ width: "100%", height: "100%" }}>
      <Router>
        <NavBar />
        <Content
          style={{
            padding: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={<FullScreenWrapper component={<Home />} />}
            />
            <Route
              path="/cryptoCharts"
              element={<FullScreenWrapper component={<CryptoChart />} />}
            />
            <Route
              path="/login"
              element={<FullScreenWrapper component={<Login />} />}
            />
            <Route
              path="/register"
              element={<FullScreenWrapper component={<CreateAccount />} />}
            />
            <Route
              path="/alertHistory"
              element={<FullScreenWrapper component={<AlertHistory />} />}
            />
            <Route
              path="/CryptoList"
              element={<FullScreenWrapper component={<CryptoList />} />}
            />
          </Routes>
        </Content>
      </Router>
    </Layout>
  );
}

const FullScreenWrapper = ({ component }: { component: React.ReactNode }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
    }}
  >
    {component}
  </div>
);

export default App;
