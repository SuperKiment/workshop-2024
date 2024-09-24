import "../style/style.css";
import logo from "../img/Hippocampe.png";
import DevTools from "../components/DevTools";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Profil() {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="App back4">
      <DevTools />

      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">
            <img src={logo} alt="Logo" className="logoImg" />
            <p>SWIPE O'CAMP</p>
          </a>
        </div>
      </nav>
      <div className="container">
        <div></div>
        <div>
          <h1>Profil</h1>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ margin: "50px" }}>
              <p>Firstname : </p>
              <p>Lastname : </p>
              <p>E-Mail : </p>
              <p>Admin : </p>
              <p>Grade : </p>
              <p>Campus : </p>
            </div>

            <div style={{ margin: "50px" }}>
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
              <p>{user.mail}</p>
              <p>{user.isAdmin == 0 ? "Non" : "Oui"}</p>
              <p>{user.idGrade}</p>
              <p>{user.idCampus}</p>
            </div>
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
