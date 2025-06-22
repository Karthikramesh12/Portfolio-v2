import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

const HeroSection = () => {
  const diamondRef = useRef(null);
  const heroSectionRef = useRef(null);
  const mouseX = useRef(window.innerWidth / 2);
  const mouseY = useRef(window.innerHeight / 2);
  const posX = useRef(window.innerWidth / 2);
  const posY = useRef(window.innerHeight / 2);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const handleScroll = () => {
      if (heroSectionRef.current && !isMobile) {
        const scrolled = window.pageYOffset;
        const scrollProgress = Math.min(scrolled / window.innerHeight, 1);
        
        // Scale from 1 to 1.15 based on scroll progress
        const scale = 1 + (scrollProgress * 0.15);
        
        heroSectionRef.current.style.backgroundSize = `${scale * 100}%`;
      }
    };

    const animate = () => {
      // Only animate diamond on non-mobile devices for better performance
      if (!isMobile) {
        // Lerp toward mouse position
        posX.current += (mouseX.current - posX.current) * 0.08;
        posY.current += (mouseY.current - posY.current) * 0.08;

        if (diamondRef.current) {
          diamondRef.current.style.left = `${posX.current}px`;
          diamondRef.current.style.top = `${posY.current}px`;
        }
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    animate(); // start animation loop

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <section className="hero-section" ref={heroSectionRef}>
      {/* Smooth-following diamond - hidden on mobile for better performance */}
      {!isMobile && <div className="diamond-accent" ref={diamondRef}></div>}
      
      {/* Main content */}
      <div className="container-fluid hero-container">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-12 col-lg-6 hero-left">
            <div className="text-center text-lg-start">
              <h1 className="hero-title">
                Engineering a<br />
                Smarter Future
              </h1>
            </div>
          </div>
          <div className="col-12 col-lg-6 hero-right">
            <div className="hero-content-right">
              <p className="hero-description text-center text-lg-start">
                Revolutionizing manufacturing and engineering with AI 
                technology that optimizes production workflows, 
                improve product quality, and reduce costs.
              </p>
              <div className="text-center text-lg-start">
                <button className="hero-cta">
                  <span className='text'>Contact Us</span>
                  <span className="arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom info */}
      <div className="bottom-left-info position-absolute">
        <div className="info-group d-flex flex-column flex-sm-row align-items-start align-items-sm-center">
          <span className="year">2025</span>
          <span className="location">Based in Austin, TX</span>
        </div>
      </div>

      <div className="bottom-right-logo position-absolute d-flex align-items-center justify-content-center">
        <div className="logo-circle d-flex align-items-center justify-content-center">
          <div className="logo-inner"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;