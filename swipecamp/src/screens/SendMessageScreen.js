import React from "react";
import SendMessage from "../components/SendMessageForm";
import logo from "../img/Hippocampe.png";
import "../style/style.css";
import "../style/back2.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const MessageScreen = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  return (
    <div className="App back4 long">
      <nav className="navbarBack4">
        <div className="navbar-logoBack4">
          <a href="/">
            <img src={logo} alt="Logo" className="logoImg" />
            <p>SWIPE O'CAMP</p>
          </a>
        </div>
        <div className="navbar-menuBack4">
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
      <div className="message-screen">
      <button
          onClick={() => {
            navigate("/MessageContacts");
          }}
        >
          Revenir aux conversations
        </button>
      <h1 className="underline">Envoyer un message</h1>
      <SendMessage />
    </div>
    </div>
  );
};

export default MessageScreen;
