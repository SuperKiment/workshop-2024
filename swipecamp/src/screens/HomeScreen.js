import { Link } from "react-router-dom";
import DevTools from "../components/DevTools";
import "../style/style.css";
import logo from "../img/Hippocampe.png";
import flyer from "../img/SwipeOCamp.png";
import { useNavigate  } from "react-router-dom";
import { useId, useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const campusSelectId = useId();
  const [campus, setCampus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCampus = async () => {
    try {
      const response = await fetch("https://s4-8096.nuage-peda.fr/campus");
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      const data = await response.json();
      setCampus(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCampus();
  }, []);

  return (
    <div className="App back1">
      <DevTools />
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">
            <img src={logo} alt="Logo" className="logoImg" />
            <p>SWIPE O'CAMP</p>
          </a>
        </div>
        <div className="navbar-menu">
          <button>Mon espace</button>
        </div>
      </nav>
      <div className="container">
        <div className="twoColumns">
          <h1>
            Découvre <em className="underline">toute ​l’actualité</em> de ton
            ​campus !
          </h1>
          {/* <button onClick={() => navigate('/campus')}>Je choisis mon campus</button> */}
          <h2>Je choisis mon campus :</h2>
          <select id={campusSelectId} name="selectedCampus">
            {loading ? (
              <option>Chargement des campus...</option>
            ) : error ? (
              <option>{error}</option>
            ) : (
              campus.map((campusItem) => (
                <option key={campusItem.idCampus} value={campusItem.name}>
                  {campusItem.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="twoColumns">
          <img src={flyer} alt="flyer" className="flyer" />
        </div>
      </div>
    </div>
  );
}

export default Home;
