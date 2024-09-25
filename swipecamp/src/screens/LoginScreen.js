import "../style/style.css";
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
    <div className="App back4">
      {/* <DevTools /> */}

      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">
            <img src={logo} alt="Logo" className="logoImg" />
            <p>SWIPE O'CAMP</p>
          </a>
        </div>
      </nav>
      <div className="long">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
