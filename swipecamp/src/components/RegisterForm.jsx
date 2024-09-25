import { useState, useId, useEffect } from "react";
import { bddURL } from "../config";

const RegisterForm = ({ selectedCampusId }) => {
  const [mail, setMail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [idGrade, setIdGrade] = useState(1);
  const [idCampus, setIdCampus] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const campusSelectId = useId();
  const [campus, setCampus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const domaines = ['mail-formateur.net', 'ecoles-ifag.net', 'ecoles-epsi.net', 'ecoles-epsi-wis.net', 'campus-cd.com'];
  const domainesAdmin = ['campus-cd.com'];

  // useEffect(() => {
  //   getCampus();
  //   console.log(campus);

  //   if (selectedCampusId) {
  //     setIdCampus(selectedCampusId);
  //   }
  // }, [selectedCampusId]);

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validateEmailDomain = (email) => {
    const emailDomain = email.split('@')[1];
    if (domainesAdmin.includes(emailDomain)) {
      setIsAdmin(true);
      return true;
    }
    if (domaines.includes(emailDomain)) {
      setIsAdmin(false);
      return true;
    }
    return false;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateEmailDomain(mail)) {
      setErrorMessage("Domaine de l'email non autorisé.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caractères, avec une majuscule, une minuscule, un chiffre et un caractère spécial.");
      return;
    }

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
        setErrorMessage("");
      } else {
        throw new Error("Erreur lors de la création de l'utilisateur");
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      setErrorMessage("Erreur lors de la création de l'utilisateur");
    }
  };

  const getCampus = async () => {
    try {
      const response = await fetch(bddURL + "campus");
      if (!response.ok) {
        throw new Error("Erreur réseau");
      }
      const data = await response.json();
      setCampus(data);
      // getChoosenCampus();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getChoosenCampus = () => {
    campus.forEach(campusItem => {
      if (campusItem.name == selectedCampusId) {
        setIdCampus(campusItem.idCampus)
        console.log(selectedCampusId);
        console.log(campusItem.name);
        console.log(campusItem.idCampus);
      }
    });
  }

  useEffect(() => {
    getCampus();
  }, []);

  useEffect(() => { getChoosenCampus() }, [campus])

  return (
    <div className="register-form">
      <h2>Inscris-toi pour avoir accès au contenu et pouvoir publier le tien !</h2>
      <form onSubmit={handleRegister} className="inputRegister">
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
        <input
          type="password"
          placeholder="Confirmez le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <select id={campusSelectId} name="selectedCampus" value={idCampus} onChange={(e) => setIdCampus(e.target.value)}>
          {loading ? (
            <option>Chargement des campus...</option>
          ) : error ? (
            <option>{error}</option>
          ) : (
            campus.map((campusItem) => (
              <option key={campusItem.idCampus} value={campusItem.idCampus}>
                {campusItem.name}
              </option>
            ))
          )}
        </select>
        <button type="submit">Créer le compte</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {/* {successMessage && <p>{successMessage}</p>} */}

      <a href="/login">
        <p className="underline pBack2">Déjà inscrit ? Se connecter</p>
      </a>
    </div>
  );
};

export default RegisterForm;
