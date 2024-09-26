import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { bddURL } from "../config";

const AddLike = ({ videoId }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [liked, setLiked] = useState(false);
  const [numerLikes, setNumberLikes] = useState(9465);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLike = async () => {
      if (user) {
        try {
          const response = await fetch(
            `${bddURL}videos/${videoId}/like/check/${user.idUser}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          const result = await response.json();
          if (result.liked) {
            setLiked(true);
          }
        } catch (error) {
          console.error(
            "Erreur lors de la vérification du like :",
            error.message
          );

          setError(error.message);
        }
      }
    };

    checkLike();
    countLikes();
  }, [user, videoId]);

  const countLikes = () => {
    try {
      const response = fetch(`${bddURL}videos/${videoId}/like/count`).then(
        async (countJSON) => {
          const count = await countJSON.json();
          setNumberLikes(await count.count);
        }
      );
    } catch (error) {}
  };

  const changeLike = async () => {
    if (!user) {
      console.error("Utilisateur non authentifié");
      return;
    }

    try {
      const response = await fetch(`${bddURL}/videos/${videoId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ userId: user.idUser }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout ou du retrait du like");
      }

      const result = await response.json();
      setLiked((prevLiked) => !prevLiked);
      console.log(result.message);
    } catch (error) {
      console.error("Erreur lors du toggle du like :", error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <button onClick={changeLike}>
        <img
          src="/like.png"
          alt="comment"
          style={liked ? { backgroundColor: "red" } : null}
        />
        <p style={{ color: "white", margin: 0 , fontSize:"15px"}}>{numerLikes}</p>
      </button>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
    </div>
  );
};

export default AddLike;
