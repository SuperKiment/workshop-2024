import { bddURL } from "../config";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import "../style/back4.css";

const UploadForm = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isGlobal, setIsGlobal] = useState(false);
  const [message, setMessage] = useState("");

  const { user } = useUserContext();

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleIsGlobalChange = (e) => {
    setIsGlobal(e.target.checked);
  };

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!videoFile) {
      setMessage("Veuillez sélectionner un fichier vidéo.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("content", description);
    formData.append("isGlobal", isGlobal ? "1" : "0");
    formData.append("idUser", user.idUser);

    try {
      const response = await fetch(bddURL + "upload", {
        method: "POST",
        body: formData,
      }).then(async (responseData) => {
        if (responseData.ok) {
          setMessage("Vidéo uploadée avec succès !");
        }
      });
    } catch (error) {
      setMessage("Erreur lors de l'upload de la vidéo.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <label className="pBack4" htmlFor="desc">
        Description :
      </label>
      <input
        type="text"
        name="desc"
        id="desc"
        onChange={handleDescriptionChange}
        value={description}
      />
      <label className="pBack4" htmlFor="desc">
        La vidéo est globale ?
      </label>
      <input
        type="checkbox"
        name="isGlobal"
        id="isGlobal"
        onChange={handleIsGlobalChange}
        checked={isGlobal}
      />

      <label className="pBack4" htmlFor="file">
        Vidéo :
      </label>
      <input
        type="file"
        accept="video/*"
        name="file"
        id="file"
        onChange={handleFileChange}
      />
      <button type="submit">Envoyer</button>
      <p>{message}</p>
    </form>
  );
};

export default UploadForm;
