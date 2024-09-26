import "./style/style.css";
import logo from "./img/Hippocampe.png";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./screens/HomeScreen";
import Campus from "./screens/CampusScreen";
import Login from "./screens/LoginScreen";
import { UserProvider } from "./context/UserContext";
import Register from "./screens/RegisterScreen";
import Profil from "./screens/ProfilScreen";
import Videos from "./screens/VideosScreen";
import AddComplaintScreen from "./screens/AddComplaintScreen";
import Need from "./screens/NeedScreen";
import MessageScreen from "./screens/SendMessageScreen";
import MessageContacts from "./screens/MessageContacts";
import MessageConversation from "./screens/MessageConversation";
import Logout from "./screens/Logout";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campus" element={<Campus />} />
          <Route path="/register/:campusId" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/complaint" element={<AddComplaintScreen />} />
          <Route path="/need" element={<Need />} />
          <Route path="/sendMessage" element={<MessageScreen />} />
          <Route path="/messageContacts" element={<MessageContacts />} />
          <Route path="/messages/:idUser" element={<MessageConversation />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
