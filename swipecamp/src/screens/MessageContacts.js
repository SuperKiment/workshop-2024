import React, { useState, useEffect } from "react";
import { bddURL } from "../config";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const MessageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUserContext();
  const navigate = useNavigate();
  const userStorage = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    
    try {
      const response = await fetch(`${bddURL}users/${userStorage.idUser}/messages/contacts`);
    //   console.log(`${bddURL}users/${userStorage.idUser}/messages/contacts`)
      
      
      if (!response.ok) {
          throw new Error("Erreur réseau");
        }
        
        const data = await response.json();
        // console.log(data);
      setContacts(data);
    } catch (error) {
        console.log('erreur : ',error);
      setError("Erreur lors de la récupération des contacts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Mes contacts de messages</h1>
      {loading ? (
        <p>Chargement des contacts...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : contacts.length === 0 ? (
        <p>Vous n'avez échangé de messages avec personne pour l'instant.</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.idUser}>
              {contact.firstName} {contact.lastName}
              <button onClick={() => navigate(`/messages/${contact.idUser}`)}>
                Voir les messages
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessageContacts;
