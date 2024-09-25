import { bddURL } from "../config";
import { useState } from "react";

const UploadForm = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState("");

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

    try {
      const response = await fetch(bddURL + "upload", {
        method: "POST",
        body: formData,
      });

      setMessage("Vidéo uploadée avec succès !");
      console.log(response.data);
    } catch (error) {
      setMessage("Erreur lors de l'upload de la vidéo.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Titre :</label>
      <input type="text" name="title" id="title" />
      <label htmlFor="desc">Titre :</label>
      <input type="text" name="desc" id="desc" />
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default UploadForm;
