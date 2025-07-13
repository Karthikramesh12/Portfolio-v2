import './Hero.css';
import NavBar from './NavBar';
import HeroBg from '../assets/hero-bg.mp4';

function Hero() {
  return (
    <div className="hero-section">
      <NavBar/>
      {/* Video Background */}
      <div className="hero-video-container">
        <video 
          className="hero-video" 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src={HeroBg} type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Blue Gradient Overlay */}
      <div className="hero-overlay"></div>
      
      {/* Content */}
      <div className="hero-content d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <div className="hero-text-wrapper">
                <h1 className="hero-title">
                  YOUR <span className="hero-title-highlight">VISION</span> IS<br />
                  OUR <span className="hero-title-highlight">MISSION.</span>
                </h1>
                <p className="hero-subtitle">
                  We're here to create bold digital solutions that convert
                </p>
                <div className="hero-cta">
                  <a href="#contact" className="btn hero-btn-secondary">
                    <div className="btn-layer">
                      <span className="btn-text current">Let's Contact</span>
                      <span className="btn-text hover">Let's Contact</span>
                    </div>
                    <span className="arrow-circle">
                      <span className="arrow">&rarr;</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;