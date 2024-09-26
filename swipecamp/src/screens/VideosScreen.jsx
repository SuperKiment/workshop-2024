import "../style/style.css";
import logo from "../img/Hippocampe.png";
import { useEffect, useState } from "react";
import UploadForm from "../components/UploadForm";
import VideosList from "../components/VideosList";
import "../style/back3.css";
import DropdownNavigation from "./DropdownNavigation";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../style/swipe.css";

function Videos() {
  const [uploadVisible, setUploadVisible] = useState();
  const [filActualite, setFilActualite] = useState("Admin");
  const {user} = useUserContext();
  const navigate = useNavigate();

  const fils = ["Campus", "Reseau", "Admin"];

  return (
    <div className="App back4">

      <nav className="navbarBack3">
        <div className="navbar-logoBack3">
          <a href="/">
            <img src={logo} alt="Logo" className="logoImg" />
            <p>SWIPE O'CAMP</p>
          </a>
        </div>
        <div className="navbar-menuBack1">
          {user ? (
            <DropdownNavigation />
          ) : (
            <button
              onClick={() => {
                navigate("login");
              }}
            >
              Mon Espace
            </button>
          )}
        </div>
      </nav>
      <div className="container-swipe">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "fixed",
            zIndex: 1,
          }}
          className="fils-boutons"
        >
          <a
            className="pBack4"
            style={
              filActualite == "Campus"
                ? { flex: "1", borderBottom: "5px solid white" }
                : { flex: "1" }
            }
            onClick={() => {
              setFilActualite("Campus");
            }}
          >
            Campus
          </a>
          <a
            className="pBack4"
            onClick={() => {
              setFilActualite("Reseau");
            }}
            style={
              filActualite == "Reseau"
                ? { flex: "1", borderBottom: "5px solid white" }
                : { flex: "1" }
            }
          >
            Réseau C&D
          </a>
          <a
            className="pBack4"
            onClick={() => {
              setFilActualite("Admin");
            }}
            style={
              filActualite == "Admin"
                ? { flex: "1", borderBottom: "5px solid white" }
                : { flex: "1" }
            }
          >
            Administration
          </a>
          <a
            className="pBack4"
            style={{ flex: "1" }}
            onClick={() => {
              setUploadVisible(!uploadVisible);
            }}
          >
            Upload
          </a>
        </div>

        {uploadVisible && <UploadForm />}
        {!uploadVisible &&
          fils.map((fil, index) => {
            return (
              filActualite == fil && (
                <VideosList key={index} filActualite={fil} />
              )
            );
          })}
      </div>
    </div>
  );
}

export default Videos;
