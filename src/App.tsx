import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./Interfaces/NavBar";
import Login from "./Interfaces/User/LogIn";
import Home from "./Interfaces/Home";
import CryptoList from "./Interfaces/CryptoList";
import { Layout } from "antd";
import CreateAccount from "./Interfaces/User/createAccount";

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
      {" "}
      <Router>
        <NavBar />
        <Content
          style={{
            marginTop: "64px", // Adjust based on NavBar height if it's fixed
            padding: "0",
            width: "100%",
            display: "flex",
            justifyContent: "center", // Center content horizontally if needed
            alignItems: "center", // Center content vertically if needed
          }}
        >
          <Routes>
            <Route
              path="/"
              element={<FullScreenWrapper component={<Home />} />}
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
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {component}
  </div>
);

export default App;
