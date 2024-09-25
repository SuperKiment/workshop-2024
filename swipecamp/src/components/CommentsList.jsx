import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { bddURL } from "../config";

const CommentsList = ({ videoId }) => {
  const { user } = useUserContext();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${bddURL}/videos/${videoId}/comments`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des commentaires");
      }
      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteComment = async (idComment) => {
    try {
      const response = await fetch(`${bddURL}/comments/${idComment}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du commentaire");
      }

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.idComment !== idComment)
      );
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du commentaire :",
        error.message
      );
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {comments.length == 0 ? (
        <p>No Comments :(</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.idComment}>
            <p>{comment.content}</p>
            {user.idUser === comment.idUser && (
              <button onClick={() => deleteComment(comment.idComment)}>
                Supprimer
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CommentsList;
