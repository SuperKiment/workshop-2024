import React, { useState, useEffect } from "react";
import { bddURL } from "../config";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../style/style.css";
import "../style/back4.css";
import logo from "../img/Hippocampe.png";

const MessageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUserContext();
  const navigate = useNavigate();
  const userStorage = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `${bddURL}users/${userStorage.idUser}/messages/contacts`
      );
      //   console.log(`${bddURL}users/${userStorage.idUser}/messages/contacts`)

      if (!response.ok) {
        throw new Error("Erreur réseau");
      }

      const data = await response.json();
      // console.log(data);
      setContacts(data);
    } catch (error) {
      console.log("erreur : ", error);
      setError("Erreur lors de la récupération des contacts");
    } finally {
      setLoading(false);
    }
  };

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
      <div>
        {loading ? (
          <p>Chargement des contacts...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : contacts.length === 0 ? (
          <div>
            <h1>Engage la conversation, partage tes idées !</h1>
            <p className="pBack4">
              Nous avons mis en place une messagerie ​pour que tu puisses
              échanger avec les autres ​utilisateurs de manière simple et
              rapide.
            </p>
            <button
              onClick={() => {
                navigate("/sendMessage");
              }}
            >
              Envoyer un message
            </button>
          </div>
        ) : (
          <div>
            <h1>Messagerie</h1>
            <button
              onClick={() => {
                navigate("/sendMessage");
              }}
            >
              Envoyer un message
            </button>
            <h2>Vos conversations</h2>
            {contacts.map((contact) => (
              <div className="conv container" key={contact.idUser}>
                <div className="twoColumns">
                  <h2 className="back4h22">
                    {contact.firstName} {contact.lastName}
                  </h2>
                </div>
                <div className="twoColumns">
                  <button
                    onClick={() => navigate(`/messages/${contact.idUser}`)}
                  >
                    Voir les messages
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageContacts;
