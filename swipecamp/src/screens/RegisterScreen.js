import React from "react";
import RegisterForm from "../components/RegisterForm"; 
import logo from "../img/Hippocampe.png";
import "../style/style.css";
import "../style/back2.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import {useLocation} from 'react-router-dom';

const Register = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCampusId = location.pathname.split("/").pop();

  return (
    <div className="App back2 long">
      <nav className="navbarBack2">
        <div className="navbar-logoBack2">
          <a href="/">
            <img src={logo} alt="Logo" className="logoImg" />
            <p>SWIPE O'CAMP</p>
          </a>
        </div>
        <div className="navbar-menuBack2">
          {user ? (
            <button
              onClick={() => {
                navigate("/profil");
              }}
            >
              {"Bonjour, " + user.firstName}
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Mon Espace
            </button>
          )}
        </div>
      </nav>
      <h1>Inscription</h1>
      <RegisterForm selectedCampusId={selectedCampusId}/>
    </div>
  );
};

export default Register;