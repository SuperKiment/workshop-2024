import React, { useState, useEffect } from 'react';
import { bddURL } from '../config'; 
import { useUserContext } from "../context/UserContext";

const AddComplaint = () => {
  const [content, setContent] = useState('');
  const [isGlobal, setIsGlobal] = useState(false);
  const { user } = useUserContext();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await fetch(`${bddURL}/complaintCategories`); 
      if (!response.ok) {
        throw new Error("Erreur réseau");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError(error.message); 
    } finally {
      setLoading(false);
    }
  };

  const send = async (e) => {
    e.preventDefault();
    
    const complaintData = {
      content,
      isGlobal,
      idCategoryComplaint: selectedCategory,
      idUser: user.idUser, 
    };

    try {
      const response = await fetch(`${bddURL}/complaint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaintData),
      });

      if (response.ok) {
        alert('Plaintes soumise avec succès');
        setContent('');
        setIsGlobal(false);
        setSelectedCategory('');
      } else {
        alert('Erreur lors de la soumission de la plainte');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission de la plainte:', error);
    }
  };

  return (
    <form onSubmit={send} className="inputRegister">
      <textarea
      className='inputBack3'
        placeholder="Contenu de la plainte"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={isGlobal}
            onChange={() => setIsGlobal(!isGlobal)}
          />
          Global
        </label>
      </div>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        required
        disabled={loading} 
      >
        <option value="">Sélectionnez une catégorie</option>
        {categories.length > 0 ? (
          categories.map((category) => (
            <option key={category.idCategoryComplaint} value={category.idCategoryComplaint}>
              {category.title}
            </option>
          ))
        ) : (
          <option value="" disabled>
            {loading ? 'Chargement des catégories...' : 'Aucune catégorie disponible'}
          </option>
        )}
      </select>
      <button type="submit" disabled={loading}>Soumettre la plainte</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default AddComplaint;
