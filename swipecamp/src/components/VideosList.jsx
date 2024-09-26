import { useEffect, useState, useRef } from "react";
import { bddURL } from "../config";
import { useUserContext } from "../context/UserContext";
import useWindowDimensions from "./useWindowDimensions";
import CommentsList from "./CommentsList";
import { useSwipeable } from "react-swipeable";
import "../style/swipe.css";

const VideosList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoList, setVideoList] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const url = bddURL + "videos/campus/" + user.idCampus;
    console.log(url);

    fetch(url).then(async (response) => {
      response.json().then(async (data) => {
        console.log("Vidéos :", data.length);
        setVideoList(data);
      });
    });
  }, []);

  // Gestion des swipes
  const handlers = useSwipeable({
    onSwipedUp: () => nextVideo(),
    onSwipedDown: () => prevVideo(),
    delta: 1, // seuil minimal pour déclencher un swipe
    preventScrollOnSwipe: true,
    trackTouch: true, // pour les mobiles
    trackMouse: true, // pour les PC
  });

  // Passer à la vidéo suivante
  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  // Revenir à la vidéo précédente
  const prevVideo = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videoList.length - 1 : prevIndex - 1
    );
  };

  return (
    <div {...handlers} style={styles.container}>
      {videoList.map((video, index) => (
        <div
          key={index}
          style={{
            ...styles.videoContainer,
          }}
          className={`video-container video-${
            index < currentIndex
              ? "avant"
              : index > currentIndex
              ? "apres"
              : "active"
          }`}
        >
          <video style={styles.video} autoPlay loop>
            <source
              src={bddURL + "uploads/" + video.attachement}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="sous-video">
            <p>{video.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Styles simples pour le conteneur et les vidéos
const styles = {
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    overflow: "hidden",
    position: "relative",
    top: "40px",
  },
  videoContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    textAlign: "center",
  },
  video: {
    maxHeight: "90%",
    maxWidth: "90%",
  },
};

export default VideosList;
