import { useState } from 'react';
import Logo from '../assets/Logo.svg';
import './navbar.css';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        {/* Brand/Logo */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img 
            src={Logo} 
            alt="Marqly" 
            className="navbar-logo me-2"
          />
        </a>

        {/* Mobile menu button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="navbarNav"
        >
          <div className={`hamburger-icon ${isOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Navigation items - Desktop */}
        <div className="collapse navbar-collapse justify-content-center d-none d-lg-flex" id="navbarNav">
          <ul className="navbar-nav custom-border nav-items-container">
            <li className="nav-item">
              <a className="nav-link nav-item-custom" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-item-custom" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-item-custom" href="#">Projects</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-item-custom" href="#">Pricing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-item-custom" href="#">Blog</a>
            </li>
          </ul>
        </div>

        {/* Right side items - Desktop only */}
        <div className="navbar-nav flex-row align-items-center ms-auto d-none d-lg-flex">
          {/* Cart icon with badge */}
          <div className="nav-item me-3 position-relative">
            <a href="#" className="nav-link cart-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16 5 16H17M17 13V17A2 2 0 0 1 15 19H9A2 2 0 0 1 7 17V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="cart-badge">0</span>
            </a>
          </div>
          
          {/* Contact button */}
          <a href="#get-started" className="btn hero-btn-primary">
            <span className="btn-text current">Get Started</span>
            <span className="btn-text hover">Get Started</span>
          </a>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <ul className="mobile-nav-items">
            <li className="mobile-nav-item">
              <a className="mobile-nav-link" href="#" onClick={closeMenu}>Home</a>
            </li>
            <li className="mobile-nav-item">
              <a className="mobile-nav-link" href="#" onClick={closeMenu}>About</a>
            </li>
            <li className="mobile-nav-item">
              <a className="mobile-nav-link" href="#" onClick={closeMenu}>Projects</a>
            </li>
            <li className="mobile-nav-item">
              <a className="mobile-nav-link" href="#" onClick={closeMenu}>Pricing</a>
            </li>
            <li className="mobile-nav-item">
              <a className="mobile-nav-link" href="#" onClick={closeMenu}>Blog</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;