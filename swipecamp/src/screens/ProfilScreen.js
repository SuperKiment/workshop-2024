import "../style/style.css";
import "../style/back4.css";
import logo from "../img/Hippocampe.png";
import DevTools from "../components/DevTools";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Profil() {
  const { user, logout, setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("user"))) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="App back4 long">
      {/* <DevTools /> */}

      <nav className="navbarBack4">
        <div className="navbar-logoBack4">
          <a href="/">
            <img src={logo} alt="Logo" className="logoImg" />
            <p>SWIPE O'CAMP</p>
          </a>
        </div>
      </nav>
      <div className="containerBack4">
        <div></div>
        <div>
          <h1>Profil</h1>

          <div className="profil">
            <div style={{ margin: "50px" }}>
              <p className="pBack4">Firstname : </p>
              <p className="pBack4">Lastname : </p>
              <p className="pBack4">E-Mail : </p>
              <p className="pBack4">Admin : </p>
              <p className="pBack4">Grade : </p>
              <p className="pBack4">Campus : </p>
            </div>

            {user && (
              <div style={{ margin: "50px" }}>
                <p className="pBack4">{user.firstName}</p>
                <p className="pBack4">{user.lastName}</p>
                <p className="pBack4">{user.mail}</p>
                <p className="pBack4">{user.isAdmin == 0 ? "Non" : "Oui"}</p>
                <p className="pBack4">{user.idGrade}</p>
                <p className="pBack4">{user.idCampus}</p>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Se Déconnecter
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Profil;
