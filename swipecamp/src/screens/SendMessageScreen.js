import React from "react";
import SendMessage from "../components/SendMessageForm";
import logo from "../img/Hippocampe.png";
import "../style/style.css";
import "../style/back2.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MessageScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="message-screen">
      <h1>Envoyer un message</h1>
      <SendMessage idUserReceiver={1} />
    </div>
  );
};

export default MessageScreen;
