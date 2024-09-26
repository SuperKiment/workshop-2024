import DevTools from "../components/DevTools";
import "../style/style.css";
import "../style/back1.css";
import logo from "../img/Hippocampe.png";
import flyer from "../img/SwipeOCamp.png";
import { useNavigate } from "react-router-dom";
import { useId, useState, useEffect, props } from "react";
import { useUserContext } from "../context/UserContext";
import AddCommentScreen from "../screens/AddCommentScreen"; 
import { bddURL } from "../config";
import AddLike from "../components/AddLike";
import CommentsList from "../components/CommentsList";
import DropdownNavigation from "./DropdownNavigation";

function Home() {
  const navigate = useNavigate();
  const campusSelectId = useId();
  const [selectedCampus, setSelectedCampus] = useState("PARIS");
  const [campus, setCampus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUserContext();

  const getCampus = async () => {
    try {
      const response = await fetch(bddURL + "campus");
      if (!response.ok) {
        throw new Error("Erreur réseau");
      }
      const data = await response.json();
      setCampus(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCampusChange = (e) => {
    setSelectedCampus(e.target.value);
  };

  useEffect(() => {
    getCampus();
  }, []);

  return (
    <div className="App back1 long">
      {/* <DevTools /> */}
      <nav className="navbarBack1">
        <div className="navbar-logoBack1">
          <a href="/">
            <img src={logo} alt="Logo" className="logoImg" />
            <p>SWIPE O'CAMP</p>
          </a>
        </div>
        <div className="navbar-menuBack1">
          {user ? (
            <DropdownNavigation />
          ) : (
            <button
              onClick={() => {
                navigate("login");
              }}
            >
              Mon Espace
            </button>
          )}
        </div>
      </nav>
      <div className="container">
        <div className="twoColumns">
          <h1>
            Découvre <em className="underline">toute ​l’actualité</em> de ton
            ​campus !
          </h1>
          {user ? (
            <>
              <div>
                <button
                  onClick={() => {
                    navigate("/videos");
                  }}
                  style={{ margin: "10px" }}
                >
                  Accéder au feed !
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>Je choisis mon campus :</h2>
              <select
                id="selectedCampus"
                name="selectedCampus"
                value={selectedCampus}
                onChange={handleCampusChange}
              >
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
              <h2>Je m'inscris :</h2>
              <button
                onClick={() => {
                  navigate(`/register/${selectedCampus}`);
                }}
              >
                S'INSCRIRE
              </button>
              <a href="/login">
                <p className="underline pBack1">Déjà inscrit ? Se connecter</p>
              </a>
            </>
          )}
        </div>
        {/* <AddCommentScreen videoId={1} /> */}

        {/* <AddLike videoId={1} /> */}
        {/* <CommentsList videoId={1} /> */}

        <div className="twoColumns">
          <img src={flyer} alt="flyer" className="flyer" />
        </div>
      </div>
    </div>
  );
}

export default Home;
