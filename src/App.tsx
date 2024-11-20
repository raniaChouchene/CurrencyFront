import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./Interfaces/NavBar";
import Login from "./Interfaces/User/LogIn";
import Home from "./Interfaces/Home";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
