import { useEffect, useState, useRef } from "react";
import { bddURL } from "../config";
import { useUserContext } from "../context/UserContext";
import useWindowDimensions from "./useWindowDimensions";
import CommentsList from "./CommentsList";

const VideosList = () => {
  const [videos, setVideos] = useState([]);
  const { height } = useWindowDimensions();
  const { user } = useUserContext();
  const videoRefs = useRef([]); // Refs pour toutes les vidéos
  const [currentVideo, setCurrentVideo] = useState(0); // Vidéo actuelle visible

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    try {
      fetch(bddURL + "videos/" + storedUser.idCampus).then(async (response) => {
        response.json().then(async (data) => {
          setVideos(data);
          console.log("Vidéos :", data.length);
        });
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const scrollToVideo = (index) => {
    for (let video of videoRefs.current) {
      if (!video.paused) video.pause();
    }

    if (videoRefs.current[index]) {
      videoRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center", // Scroll jusqu'au centre
      });
      videoRefs.current[index].play();
      setCurrentVideo(index);
    }
  };

  const handleNext = () => {
    const nextVideo = currentVideo + 1 < videos.length ? currentVideo + 1 : 0; // Boucle à la première vidéo si c'est la dernière
    scrollToVideo(nextVideo);
  };

  const handlePrev = () => {
    const prevVideo =
      currentVideo - 1 >= 0 ? currentVideo - 1 : videos.length - 1; // Boucle à la dernière vidéo si c'est la première
    scrollToVideo(prevVideo);
  };

  const BoutonsNavigation = () => {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        }}
      >
        <button onClick={handlePrev}>Précédent</button>
        <button onClick={handleNext} style={{ marginLeft: "10px" }}>
          Suivant
        </button>
      </div>
    );
  };

  const OneVideo = ({ index, video }) => {
    const [commentsVisible, setCommentsVisible] = useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <video
          ref={(el) => (videoRefs.current[index] = el)}
          width={height / (16 / 9)}
          height={height}
          controls
          style={{ backgroundColor: "black", margin: "20px" }}
        >
          <source
            src={`${bddURL}uploads/${video.attachement}`}
            type="video/mp4"
          />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
        <div>
          <button
            onClick={() => {
              setCommentsVisible(!commentsVisible);
            }}
          >
            Commentaires
          </button>

          {commentsVisible && (
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "30px",
              }}
            >
              <CommentsList videoId={video.idVideo} />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        {videos.map((video, index) => {
          return <OneVideo index={index} video={video} key={index} />;
        })}
      </div>
      <BoutonsNavigation />
    </div>
  );
};

export default VideosList;
