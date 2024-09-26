import React, { useState, useEffect } from "react";
import { bddURL } from "../config";
import { useUserContext } from "../context/UserContext";

const SendMessage = () => {
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const { user } = useUserContext();
    const [users, setUsers] = useState([]);
    const [idUserReceiver, setIdUserReceiver] = useState("");

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await fetch(`${bddURL}/users`); 
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
            setError("Erreur lors de la récupération des utilisateurs");
        }
    };


    const addMessage = async (e) => {
        e.preventDefault();

        if (!idUserReceiver) {
            setError("Veuillez sélectionner un destinataire");
            return;
        }

        const messageData = {
            content,
            idUserSender: user.idUser,
            idUserReceiver,
        };

        try {
            const response = await fetch(`${bddURL}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(messageData),
            });

            if (response.ok) {
                const data = await response.json();
                setContent("");
            } else {
                setError("Erreur lors de l'envoi du message1");
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi du message2 :", error);
            setError("Erreur lors de l'envoi du message3");
        }
    };

    return (
        <div className="register-formBack4 register-form">
            <form onSubmit={addMessage}>
            <div>
                <label className="pBack4Bis ">Choisir un destinataire : </label>
                <select
                    value={idUserReceiver}
                    onChange={(e) => setIdUserReceiver(e.target.value)}
                    required
                >
                    <option value="">Sélectionnez un utilisateur</option>
                    {users.map((user) => (
                        <option key={user.idUser} value={user.idUser}>
                            {user.firstName} {user.lastName}
                        </option>
                    ))}
                </select>
            </div>
            <textarea
                placeholder="Écrire un message"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <button type="submit">Envoyer le message</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    </div>
        
    );
};


export default SendMessage;
