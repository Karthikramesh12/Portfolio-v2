import { useEffect, useRef } from 'react';
import Deepcept_AI from '../assets/Deepcept_AI.png';
import Icon2 from '../assets/icon-2.svg';
import Chess from '../assets/Chess.png';
import Icon3 from '../assets/icon-3.svg';
import Icon1 from '../assets/icon-1.svg';
import WordPress from '../assets/WordPress_website.png';
import Portfolio_karthik from '../assets/Karthik_portfolio.png';
import Avani_Dvaras from '../assets/avani-dvara.png'
import './Projects.css';

const Projects = () => {
  const containerRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);

const projectData = [
  {
    logo: Icon1,
    heading: "Deepcept AI",
    description: "Redesigned and redeveloped Deepcept AI's website to improve UI/UX, functionality, and engagement.",
    image: Avani_Dvaras,
    link: "https://deepcept.ai/"
  },
  {
    logo: Icon2,
    heading: "Chess Engine",
    description: "Created a chess game with AI using vanilla JavaScript, with increasing difficulty based on AI response time.",
    image: Portfolio_karthik,
    link: "https://karthikramesh12.github.io/chess_game/"
  },
  {
    logo: Icon3,
    heading: "WordPress Medical Website",
    description: "Developed a responsive WordPress-based medical website with engaging animations and user-friendly UI.",
    image: WordPress,
    link: "http://amazon-filpcart.42web.io/homepage/"
  },
  {
    logo: Icon1,
    heading: "Portfolio Website",
    description: "A basic HTML/CSS/JS portfolio showcasing my personal projects, skills, and experience.",
    image: Chess,
    link: "https://karthikramesh12.github.io/Portfolio/"
  },
  {
    logo: Icon2,
    heading: "Avani Dvaras",
    description: "Designed a clean and elegant website for an interior company using React and Vite, blending high-end aesthetics with minimalism.",
    image: Deepcept_AI,
    link: "https://avani-dvara-demo.netlify.app/" 
  }
];


  const updateContentPosition = () => {
    const container = containerRef.current;
    if (!container) return;
    
    const scrollY = window.scrollY;
    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    const windowHeight = window.innerHeight;
    
    // Calculate scroll zone boundaries
    const scrollZoneStart = containerTop;
    const scrollZoneEnd = containerTop + containerHeight - windowHeight;
    
    // Check if we're in the scroll zone
    if (scrollY >= scrollZoneStart && scrollY <= scrollZoneEnd) {
      // Calculate progress through the scroll zone (0 to 1)
      const scrollProgress = (scrollY - scrollZoneStart) / (scrollZoneEnd - scrollZoneStart);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      
      // Calculate how many slides to move through
      const totalSlides = projectData.length - 1;
      const slideProgress = clampedProgress * totalSlides;
      
      // Calculate transforms - both use the same slideProgress value
      const slideHeight = 100; // 100vh per slide to match container height
      const transformAmount = slideProgress * slideHeight;
      
      // Apply transforms - left moves up, right moves down, same speed
      if (leftContentRef.current) {
        leftContentRef.current.style.transform = `translateY(-${transformAmount}vh)`;
      }
      
      if (rightContentRef.current) {
        // Right container starts at negative position, so we move it in the same direction as left
        rightContentRef.current.style.transform = `translateY(${transformAmount}vh)`;
      }
    
    } else if (scrollY < scrollZoneStart) {
      // Before scroll zone - reset to first slide
      if (leftContentRef.current) {
        leftContentRef.current.style.transform = `translateY(0vh)`;
      }
      if (rightContentRef.current) {
        rightContentRef.current.style.transform = `translateY(0vh)`;
      }
    } else {
      // After scroll zone - stay at last slide
      const maxTransform = (projectData.length - 1) * 100;
      if (leftContentRef.current) {
        leftContentRef.current.style.transform = `translateY(-${maxTransform}vh)`;
      }
      if (rightContentRef.current) {
        rightContentRef.current.style.transform = `translateY(${maxTransform}vh)`;
      }
    }
  };

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateContentPosition();
          rafId = null;
        });
      }
    };

    // Initial position update
    updateContentPosition();

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [projectData.length]);

  return (
    <div
      ref={containerRef}
      className="container p-0"
      style={{ height: `${projectData.length * 100}vh` }}
    >
      <div className="row g-0 machinery-container" style={{ position: 'sticky', top: 0, height: '100vh' }}>
        {/* Left Section */}
        <div className="col-lg-6 d-flex align-items-center bg-light left-section" style={{ overflow: 'hidden' }}>
          <div
            ref={leftContentRef}
            className="container-fluid"
            style={{
              height: `${projectData.length * 100}vh`,
              display: 'flex',
              flexDirection: 'column',
              willChange: 'transform',
              position: 'relative'
            }}
          >
            {projectData.map((project, index) => (
              <div key={index} className="d-flex align-items-center justify-content-center" style={{
                height: '100vh',
                minHeight: '100vh',
                flexShrink: 0,
                padding: '0 2rem'
              }}>
                <div className="w-100">
                  <div className="logo-container mb-4">
                    <img src={project.logo} alt="Company Logo" className="logo-svg" />
                  </div>
                  <div className="content-section">
                    <h1 className="display-4 project-heading text-dark mb-4">
                      {project.heading}
                    </h1>
                    <p className="lead text-muted custom-project-desc mb-4" style={{ maxWidth: '500px' }}>
                      {project.description}
                    </p>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
  <button className="btn intro-btn">
    Learn More <span className="arrow">→</span>
  </button>
</a>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="col-lg-6 position-relative right-section" style={{ overflow: 'hidden' }}>
          {/* Static background container */}
          <div className="purple-bg-section d-flex align-items-center justify-content-center" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 1
          }}>
            {/* Background */}
          </div>
          
          {/* Moving images container */}
          <div
            ref={rightContentRef}
            style={{
              height: `${projectData.length * 100}vh`,
              display: 'flex',
              flexDirection: 'column',
              willChange: 'transform',
              position: 'absolute',
              top: `-${(projectData.length - 1) * 100}vh`, // Start positioned to show first image
              left: 0,
              width: '100%',
              zIndex: 2
            }}
          >
            {projectData.map((project, index) => (
              <div key={index} className="d-flex align-items-center justify-content-center" style={{
                height: '100vh',
                minHeight: '100vh',
                flexShrink: 0
              }}>
                <div className="image-container">
                  <img src={project.image} alt={`${project.heading} image`} className="img-fluid machinery-image" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;