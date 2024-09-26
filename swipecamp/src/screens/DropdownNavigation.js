import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const DropdownNavigation = () => {
  const navigate = useNavigate(); 
  const [selectedOption, setSelectedOption] = useState('');
  const { user } = useUserContext();

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue) {
      navigate(`/${selectedValue}`);
    }
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">Bonjour, {user.firstName}</option>
        <option value="profil">Profil</option>
        <option value="messageContacts">Messagerie</option>
        <option value="complaint">Réclamations</option>
        <option value="logout">Déconnexion</option>
      </select>
    </div>
  );
};

export default DropdownNavigation;
