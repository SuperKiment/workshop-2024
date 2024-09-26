import { useEffect, useState, useRef } from "react";
import { bddURL } from "../config";
import { useUserContext } from "../context/UserContext";
import useWindowDimensions from "./useWindowDimensions";
import CommentsList from "./CommentsList";
import { useSwipeable } from "react-swipeable";

const VideosList = ({ filActualite }) => {
  const [videos, setVideos] = useState([]);
  const [videosToShow, setVideosToShow] = useState([]);
  const { height } = useWindowDimensions();
  const { user } = useUserContext();
  const videoRefs = useRef([]); // Refs pour toutes les vidéos
  const [currentVideo, setCurrentVideo] = useState(0); // Vidéo actuelle visible

  // Gestion du swipe
  const handlers = useSwipeable({
    onSwipedUp: () => handleNext(),
    onSwipedDown: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Gère les swipes avec la souris également
  });

  useEffect(() => {
    getMoreVideos();
    console.log(filActualite);
  }, []);

  const scrollToVideo = (index) => {
    for (let video of videoRefs.current) {
      //   if (!video.paused) video.pause();
    }

    if (videoRefs.current[index]) {
      videoRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      //   videoRefs.current[index].play();
      setCurrentVideo(index);
    }
  };

  const getMoreVideos = async () => {
    let url = "";
    const userStored = JSON.parse(localStorage.getItem("user"));

    switch (filActualite) {
      case "Campus":
        url = bddURL + "videos/campus/" + userStored.idCampus;
        break;
      case "Reseau":
        url = bddURL + "videos/reseau/";
        break;
      case "Admin":
        url = bddURL + "videos/admin/";
        break;
    }
    try {
      fetch(url).then(async (response) => {
        response.json().then(async (data) => {
          setVideos(...videos, data);
          setVideosToShow(...videosToShow, [data[0], data[1]]);
          console.log("Vidéos :", data.length);
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  const addVideoAtEnd = async () => {
    console.log("length :", videos.length, videosToShow.length);

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    let videoToAdd =
      videos[
        videos.length > videosToShow.length
          ? videosToShow.length - 1
          : getRandomInt(videos.length)
      ];
    console.log(videos);

    console.log(videoToAdd);

    console.log("added video", videoToAdd.attachement);

    setVideosToShow([...videosToShow, videoToAdd]);
  };

  const handleNext = () => {
    const nextVideo = currentVideo + 1;

    if (nextVideo + 2 > videosToShow.length) {
      addVideoAtEnd();
    }
    scrollToVideo(nextVideo);
  };

  const handlePrev = () => {
    const prevVideo =
      currentVideo - 1 >= 0 ? currentVideo - 1 : videos.length - 1;
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
      video && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            width={height / (16 / 9)}
            height={height}
            controls
            style={{ backgroundColor: "black", margin: "20px" }}
            autoPlay
            loop
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
      )
    );
  };

  return (
    <div {...handlers}>
      <div>
        {videosToShow.map((video, index) => {
          return <OneVideo index={index} video={video} key={index} />;
        })}
      </div>
      <BoutonsNavigation />
    </div>
  );
};

export default VideosList;
