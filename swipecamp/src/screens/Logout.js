import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const Logout = () => {
  const { logout } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      const confirmLogout = window.confirm("Voulez-vous vraiment vous déconnecter ?");
      if (confirmLogout) {
        await logout();
        navigate('/login');
      } else {
        navigate('/');
      }
    };

    handleLogout();  // Appelle la fonction directement à la montée du composant
  }, [logout, navigate]);

  return null; // Pas besoin de retour d'interface car on gère juste la déconnexion
};

export default Logout;
