import React, { useEffect, useState } from "react";
import AddComplaint from "../components/AddComplaintForm";
import "../style/style.css";
import "../style/back1.css";
import logo from "../img/Hippocampe.png";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const ComplaintsScreen = () => {
  const [categories, setCategories] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();
  const navigate = useNavigate();

  return (
    <div className="App back3 long">
      <nav className="navbarBack3">
        <div className="navbar-logoBack3">
          <a href="/">
            <img src={logo} alt="Logo" className="logoImg" />
            <p>SWIPE O'CAMP</p>
          </a>
        </div>
        <div className="navbar-menuBack3">
          {user ? (
            <button
              onClick={() => {
                navigate("profil");
              }}
            >
              {"Bonjour, " + user.firstName}
            </button>
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
      <h1>Soumettre une plainte</h1>
      <AddComplaint categories={categories} />
    </div>
  );
};

export default ComplaintsScreen;
