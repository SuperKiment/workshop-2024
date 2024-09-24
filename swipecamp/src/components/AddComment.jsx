// src/components/AddComment.js
import React, { useState } from 'react';
import { useUserContext } from "../context/UserContext";

const AddComment = ({ videoId }) => {
  const { user } = useUserContext();
  const [commentContent, setCommentContent] = useState("");
  const [commentSuccess, setCommentSuccess] = useState(null);
  const [error, setError] = useState(null);

  const addComment = async (idVideo, commentContent, userId, userToken) => {
    try {
      const response = await fetch(`https://s4-8096.nuage-peda.fr/videos/${idVideo}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`,
        },
        body: JSON.stringify({ content: commentContent }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du commentaire');
      }

      const result = await response.json();
      setCommentSuccess(result.message);
      setCommentContent(""); // Réinitialiser le champ
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire :', error.message);
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const userToken = user.token;
    const userId = user.idUser;

    addComment(videoId, commentContent, userId, userToken);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Écrivez votre commentaire ici..."
          required
        />
        <button type="submit">Ajouter un commentaire</button>
      </form>
      {commentSuccess && <p>{commentSuccess}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddComment;
