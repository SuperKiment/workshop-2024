import "../style/style.css";
import logo from "../img/Hippocampe.png";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { bddURL } from "../config";
import DropdownNavigation from "./DropdownNavigation";
// import paris from "../img/villes/paris.jpg";

function Campus() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const [campus, setCampus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCampus();
    // console.log(campus);
  }, []);

  const getCampus = async () => {
    try {
      const response = await fetch(`${bddURL}/campus/${userStorage.idCampus}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur réseau");
      }

      const data = await response.json();
      setCampus(data);
      // console.log(campus);
      
    } catch (error) {
      setError("Erreur lors de la récupération des campus");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="App back3">
      <nav className="navbarBack3">
        <div className="navbar-logoBack3">
          <a href="/">
            <img src={logo} alt="Logo" className="logoImg" />
            <p>SWIPE O'CAMP</p>
          </a>
        </div>
        <div className="navbar-menuBack3">
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
      <div className="long">
        <h1 className="h1Back3">Bienvenue à {campus.city}</h1>

        <div className="container">
          <div className="twoColumns">
            <h2 className="pBack3">
              Ici, tu pourras retrouver toutes les actualités de ​ton campus ;
              évènements, projets en cours, ​partage d’informations...
            </h2>
            <h2 className="pBack3">
              N’hésite surtout pas à partager également ta ​vie sur le campus !
            </h2>
            <button
                  onClick={() => {
                    navigate("/videos");
                  }}
                  style={{ margin: "10px" }}
                >
                  Accéder au feed !
                </button>
          </div>
          <div className="twoColumns">
          <img src={campus.img} alt="campusImg" className="campusImg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Campus;
