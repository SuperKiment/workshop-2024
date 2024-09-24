import React, { createContext, useState, useEffect, useContext } from "react";

// Créer le contexte
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Charger l'utilisateur depuis le localStorage lors du premier rendu
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Sauvegarder l'utilisateur dans le localStorage quand il change
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    setUser(null);
  };

  // Fournir la valeur du contexte
  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Créez un hook personnalisé pour utiliser le contexte
export const useUserContext = () => {
  return useContext(UserContext);
};
