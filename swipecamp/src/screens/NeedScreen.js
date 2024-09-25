
import "../style/style.css";
import "../style/back3.css";
import logo from "../img/Hippocampe.png";
import { useNavigate } from "react-router-dom";
import { useId, useState, useEffect, props } from "react";
import { useUserContext } from "../context/UserContext";

function Need() {
  const navigate = useNavigate();
  const { user } = useUserContext();

  

  return (
    <div className="App back3 long">
      <nav className="navbarBack3">
        <div className="navbar-logoBack3">
          <a href="/">
            <img src={logo} alt="Logo" className="logoImg" />
            <p>SWIPE O'CAMP</p>
          </a>
        </div>
        <div className="navbar-menuBack3">
          {user ? (
            <button
              onClick={() => {
                navigate("profil");
              }}
            >
              {"Bonjour, " + user.firstName}
            </button>
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
          <h1>
          Tu as une réclamation ? ​
          </h1>
          <h1>
          Un besoin ​
          </h1>
          <h2 className="pBack3">Retrouve ici l’espace pour nous faire part d’une ​réclamation ou pour prendre rendez-vous ​avec un membre du service pédagogique !</h2>
      <div className="container">
        <div className="twoColumns">
            <button onClick={() => {
                    navigate("/complaint");
                  }}>J’ai une ​réclama​tion</button>
        </div>

        <div className="twoColumns">
        <button>Je veux un ​rendez​-vous</button>
        </div>
      </div>
    </div>
  );
}

export default Need;
