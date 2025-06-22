import React, { useEffect, useRef } from 'react';
import './Hero.css';

const HeroSection = () => {
  const diamondRef = useRef(null);
  const heroSectionRef = useRef(null);
  const mouseX = useRef(window.innerWidth / 2);
  const mouseY = useRef(window.innerHeight / 2);
  const posX = useRef(window.innerWidth / 2);
  const posY = useRef(window.innerHeight / 2);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const handleScroll = () => {
      if (heroSectionRef.current) {
        const scrolled = window.pageYOffset;
        const scrollProgress = Math.min(scrolled / window.innerHeight, 1);
        
        // Scale from 1 to 1.15 based on scroll progress
        const scale = 1 + (scrollProgress * 0.85);
        
        heroSectionRef.current.style.backgroundSize = `${scale * 100}%`;
      }
    };

    const animate = () => {
      // Lerp toward mouse position
      posX.current += (mouseX.current - posX.current) * 0.08;
      posY.current += (mouseY.current - posY.current) * 0.08;

      if (diamondRef.current) {
        diamondRef.current.style.left = `${posX.current}px`;
        diamondRef.current.style.top = `${posY.current}px`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    animate(); // start animation loop

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="hero-section" ref={heroSectionRef}>
      {/* Smooth-following diamond */}
      <div className="diamond-accent" ref={diamondRef}></div>
      
      {/* Main content */}
      <div className="hero-container">
        <div className="hero-content-wrapper">
          <div className="hero-left">
            <h1 className="hero-title">
              Engineering a<br />
              Smarter Future
            </h1>
          </div>
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

      {/* Bottom info */}
      <div className="bottom-left-info">
        <div className="info-group">
          <span className="year">2025</span>
          <span className="location">Based in Austin, TX</span>
        </div>
      </div>

      <div className="bottom-right-logo">
        <div className="logo-circle">
          <div className="logo-inner"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;