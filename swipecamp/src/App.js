import './style/style.css';
import logo from './img/Hippocampe.png';

function App() {
  return (
    <div className="App back1">
      <nav className="navbar">
      <div className="navbar-logo">
        <a>
        <img src={logo} alt="Logo" className='logoImg'/>
        <p>SWIPE O'CAMP</p>
        </a>
      </div>
      <div className="navbar-menu">
        <button>Mon espace</button>
      </div>
    </nav>
    <div className='long'></div>
    </div>
  );
}

export default App;
