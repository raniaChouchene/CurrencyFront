import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./Interfaces/NavBar";
import Login from "./Interfaces/User/LogIn";
import Home from "./Interfaces/Home";
import CryptoList from "./Interfaces/CryptoList";
import { Content } from "antd/es/layout/layout";

function App() {
  return (
    <Content style={{ width: "100%", height: "100%" }}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/CryptoList" element={<CryptoList />} />
        </Routes>
      </Router>
    </Content>
  );
}

export default App;
