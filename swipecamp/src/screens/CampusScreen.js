import "../style/style.css";
import logo from "../img/Hippocampe.png";
import DevTools from "../components/DevTools";

function Campus() {
  return (
    <div className="App back4">
      <DevTools />

      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">
            <img src={logo} alt="Logo" className="logoImg" />
            <p>SWIPE O'CAMP</p>
          </a>
        </div>
      </nav>
      <div className="long">
        <p>CHOIX DU CAMPUS</p>
      </div>
    </div>
  );
}

export default Campus;
