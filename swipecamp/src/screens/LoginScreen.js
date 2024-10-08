import "../style/style.css";
import "../style/back3.css";
import logo from "../img/Hippocampe.png";
import DevTools from "../components/DevTools";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

function Login() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profil");
    }
  });

  return (
    <div className="App back3">
      {/* <DevTools /> */}

      <nav className="navbarBack3">
        <div className="navbar-logoBack3">
          <a href="/">
            <img src={logo} alt="Logo" className="logoImg" />
            <p>SWIPE O'CAMP</p>
          </a>
        </div>
      </nav>
      <div className="long">
        <h1 className="h1Back3">Connexion</h1>
        <LoginForm />
        <a href="/register/PARIS"><p className="pBack3 underline">S'incrire ici !</p></a>
      </div>
    </div>
  );
}

export default Login;
