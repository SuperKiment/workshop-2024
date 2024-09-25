import "../style/style.css";
import logo from "../img/Hippocampe.png";
import { useEffect, useState } from "react";
import UploadForm from "../components/UploadForm";
import VideosList from "../components/VideosList";
import "../style/back3.css";

function Videos() {
  const [uploadVisible, setUploadVisible] = useState();
  const [filActualite, setFilActualite] = useState("Admin");

  const fils = ["Campus", "Reseau", "Admin"];

  return (
    <div className="App back4">
      {/* <DevTools /> */}

      <nav className="navbarBack3">
        <div className="navbar-logoBack3">
          <a href="/">
            <img src={logo} alt="Logo" className="logoImg" />
            <p>SWIPE O'CAMP</p>
          </a>
        </div>
      </nav>
      <div className="container">
        <div></div>
        <div>
          <h1>Vidéos</h1>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <button
              style={
                filActualite == "Campus" ? { border: "5px solid grey" } : null
              }
              onClick={() => {
                setFilActualite("Campus");
              }}
            >
              Campus
            </button>
            <button
              onClick={() => {
                setFilActualite("Reseau");
              }}
              style={
                filActualite == "Reseau" ? { border: "5px solid grey" } : null
              }
            >
              Réseau C&D
            </button>
            <button
              onClick={() => {
                setFilActualite("Admin");
              }}
              style={
                filActualite == "Admin" ? { border: "5px solid grey" } : null
              }
            >
              Administration
            </button>
            <button
              onClick={() => {
                setUploadVisible(!uploadVisible);
              }}
            >
              Upload
            </button>
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
        <div></div>
      </div>
    </div>
  );
}

export default Videos;
