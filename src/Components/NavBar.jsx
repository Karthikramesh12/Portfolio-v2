import { useEffect, useState } from 'react';
import Logo from '../assets/Logo.png.png';
import './navbar.css';

// FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
  faLinkedinIn,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const offcanvas = document.getElementById('offcanvasMenu');
    offcanvas.addEventListener('show.bs.offcanvas', () => setIsMenuOpen(true));
    offcanvas.addEventListener('hidden.bs.offcanvas', () => setIsMenuOpen(false));
  }, []);

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar navbar-light bg-white custom-navbar ${showNavbar ? 'navbar-visible' : 'navbar-hidden'}`}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo */}
          <a className="navbar-brand asteria-logo d-flex align-items-center gap-2" href="#">
            <img src={Logo} alt="Asteria Logo" className="logo-img" />
            <span className="navbar-heading">Asteria</span>
          </a>

          {/* Hamburger Button */}
          <button
            className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu"
            aria-label="Toggle navigation"
          >
            <span className="hamburger-line top-line"></span>
            <span className="hamburger-line bottom-line"></span>
          </button>
        </div>
      </nav>

      {/* Offcanvas Menu */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel">
        <div className="offcanvas-header" />
        <div className="offcanvas-body d-flex flex-column justify-content-between px-4 py-5" style={{ height: '100%' }}>
          {/* Navigation Links */}
          <ul className="nav flex-column gap-3 fs-4">
            <li className="nav-item"><a className="nav-link off-link" href="#">01. <strong>Home</strong></a></li>
            <li className="nav-item"><a className="nav-link off-link" href="#">02. <strong>About</strong></a></li>
            <li className="nav-item"><a className="nav-link off-link" href="#">03. <strong>Solutions</strong></a></li>
            <li className="nav-item"><a className="nav-link off-link" href="#">04. <strong>Team</strong></a></li>
            <li className="nav-item"><a className="nav-link off-link" href="#">05. <strong>Blog</strong></a></li>
            <li className="nav-item"><a className="nav-link off-link" href="#">06. <strong>Contact</strong></a></li>
          </ul>

          {/* Social Icons */}
          <div className="d-flex justify-content-start gap-4 fs-5">
            <a href="#" className='text-dark'><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#" className='text-dark'><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#" className='text-dark'><FontAwesomeIcon icon={faXTwitter} /></a>
            <a href="#" className='text-dark'><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="#" className='text-dark'><FontAwesomeIcon icon={faYoutube} /></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
