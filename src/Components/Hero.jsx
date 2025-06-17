import React from 'react';
import './Hero.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* Purple diamond accent */}
      <div className="diamond-accent"></div>
      
      {/* Main content */}
      <div className="hero-container">
        <div className="hero-content-wrapper">
          {/* Left side - Main title */}
          <div className="hero-left">
            <h1 className="hero-title">
              Engineering a<br />
              Smarter Future
            </h1>
          </div>
          
          {/* Right side - Description and button */}
          <div className="hero-right">
            <p className="hero-description">
              Revolutionizing manufacturing and engineering with AI 
              technology that optimizes production workflows, 
              improve product quality, and reduce costs.
            </p>
            
            <button className="hero-cta">
              <span className='text'>Contact Us</span>
              <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom left info */}
      <div className="bottom-left-info">
        <div className="info-group">
          <span className="year">2025</span>
          <span className="location">Based in Austin, TX</span>
        </div>
      </div>
      
      {/* Bottom right logo */}
      <div className="bottom-right-logo">
        <div className="logo-circle">
          <div className="logo-inner"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;