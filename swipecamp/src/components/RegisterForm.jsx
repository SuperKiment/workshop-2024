import { useState } from "react";
import { bddURL } from "../config";

const RegisterForm = () => {
  const [mail, setMail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [idGrade, setIdGrade] = useState(1); 
  const [idCampus, setIdCampus] = useState(1); 
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${bddURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail,
          lastName,
          firstName,
          password,
          isAdmin,
          idGrade,
          idCampus,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`Utilisateur créé avec succès : ID ${data.id}`);
      } else {
        throw new Error("Erreur lors de la création de l'utilisateur");
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      setSuccessMessage("Erreur lors de la création de l'utilisateur");
    }
  };

  return (
    <div className="register-form">
      <h2>Créer un utilisateur :</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>
          Administrateur :
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
        </label>
        <button type="submit">Créer le compte</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      <a href="/login">
                <p className="underline">Déjà inscrit ? Se connecter</p>
              </a>
    </div>
  );
};

export default RegisterForm;
