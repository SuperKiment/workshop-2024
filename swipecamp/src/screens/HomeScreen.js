import '../style/style.css';
import logo from '../img/Hippocampe.png';
import flyer from '../img/SwipeOCamp.png';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App back1">
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">
            <img src={logo} alt="Logo" className='logoImg' />
            <p>SWIPE O'CAMP</p>
          </a>
        </div>
        <div className="navbar-menu">
          <button>Mon espace</button>
        </div>
      </nav>
      <div className='container'>
        <div className='twoColumns'>
          <h1 >Découvre toute ​l’actualité de ton ​campus !</h1>
          <a href="/campus"><button>Je choisis mon campus</button></a>
        </div>
        <div className='twoColumns' >
          <img src={flyer} alt="flyer" className="flyer" />
        </div>
      </div>
    </div>
  );
}

export default Home;
