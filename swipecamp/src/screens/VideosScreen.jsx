import "../style/style.css";
import logo from "../img/Hippocampe.png";
import DevTools from "../components/DevTools";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UploadForm from "../components/UploadForm";

function Videos() {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const [uploadVisible, setUploadVisible] = useState();

  return (
    <div className="App back4">
      {/* <DevTools /> */}

      <nav className="navbar">
        <div className="navbar-logo">
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

          <button
            onClick={() => {
              setUploadVisible(!uploadVisible);
            }}
          >
            Upload
          </button>
          {uploadVisible && <UploadForm />}
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Videos;
