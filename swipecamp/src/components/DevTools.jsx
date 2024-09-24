import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import LoginForm from "./LoginForm";

const DevTools = () => {
  const [visible, setVisible] = useState(true);
  const { user } = useUserContext();

  return (
    visible && (
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
            : "Se connecter dev (test@test.com)"}
        </a>

        <LoginForm />
      </div>
    )
  );
};

export default DevTools;
