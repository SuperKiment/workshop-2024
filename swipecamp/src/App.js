import './style/style.css';
import logo from './img/Hippocampe.png';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './screens/HomeScreen';
import Campus from './screens/CampusScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campus" element={<Campus />} />
      </Routes>
    </Router>
  );
}

export default App;
