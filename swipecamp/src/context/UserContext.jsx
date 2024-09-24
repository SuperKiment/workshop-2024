import React, { createContext, useState, useContext } from "react";

// Créez le contexte
const UserContext = createContext();

// Créez un Provider pour encapsuler votre état
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Créez un hook personnalisé pour utiliser le contexte
export const useUserContext = () => {
  return useContext(UserContext);
};
