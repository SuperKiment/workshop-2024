import React, { useState, useEffect } from "react";
import { bddURL } from "../config";
import { useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../style/style.css";
import "../style/back4.css";
import logo from "../img/Hippocampe.png";

const MessageConversation = () => {
  const navigate = useNavigate();
  const { idUser } = useParams();
  const { user } = useUserContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    getConversation();
    getUserDetails();
  }, []);

  const getConversation = async () => {
    try {
      const response = await fetch(
        `${bddURL}/messages/conversation?idUserSender=${userStorage.idUser}&idUserReceiver=${idUser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erreur réseau");
      }

      const data = await response.json();
      console.log(data);
      setMessages(data);
    } catch (error) {
      // console.log(error)
      setError("Erreur lors de la récupération des messages");
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await fetch(`${bddURL}/users/${idUser}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération des détails de l'utilisateur"
        );
      }

      const data = await response.json();
      setFirstName(data.firstName);
      setLastName(data.lastName);
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur lors de la récupération des détails de l'utilisateur");
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
        <button
          onClick={() => {
            navigate("/MessageContacts");
          }}
        >
          Revenir aux conversations
        </button>
        <h1 className="underline">
          Conversation avec {firstName} {lastName}
        </h1>
        {loading ? (
          <p className="pBack4">Chargement des messages...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div className="messages">
            <div className="mess">
              {messages.length === 0 ? (
                <p className="pBack4">
                  Pas de messages dans cette conversation.
                </p>
              ) : (
                <ul>
                  {messages.map((message, index) => (
                    <li
                      key={index}
                      className={`message-container ${
                        message.idUserSender == userStorage.idUser
                          ? "message-right"
                          : "message-left"
                      }`}
                    >
                      <div className="message-box">
                        <p className="pBack4"><strong className="underline">
                          {message.idUserSender === userStorage.idUser
                            ? "Moi"
                            : firstName}
                          :
                        </strong>{" "}
                        {message.content}
                        <br />
                        <small>
                          Envoyé le :{" "}
                          {new Date(message.dateSended).toLocaleString()}
                        </small>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        <button
          onClick={() => {
            navigate("/sendMessage");
          }}
        >
          Envoyer un message
        </button>
      </div>
    </div>
  );
};

export default MessageConversation;
