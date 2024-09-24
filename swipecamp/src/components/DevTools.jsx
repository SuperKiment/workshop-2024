import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

const DevTools = () => {
  const [visible, setVisible] = useState(true);
  const { user } = useUserContext();

  return (
    console.log(user) ||
    (visible && (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p style={{ flex: 1 }}>DevTools</p>
        <a
          style={{ border: "1px solid black", cursor: "pointer", flex: 1 }}
          onClick={() => {
            setVisible(false);
          }}
        >
          Cacher
        </a>

        <div style={{ flex: 1 }}></div>
        <a
          style={{ border: "1px solid black", cursor: "pointer", flex: 1 }}
          onClick={() => {
            setVisible(false);
          }}
        >
          {user
            ? "Connecté : " + user.firstName
            : "Non connecté"}
        </a>

        <LoginForm />

        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 1 }}>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/campus"}>Campus</Link></li>
            </ul>
        </div>
      </div>
    ))
  );
};

export default DevTools;
