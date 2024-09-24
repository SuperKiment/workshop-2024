import "./style/style.css";
import logo from "./img/Hippocampe.png";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./screens/HomeScreen";
import Campus from "./screens/CampusScreen";
import { UserProvider } from "./context/UserContext";
import Register from "./screens/RegisterScreen";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campus" element={<Campus />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
