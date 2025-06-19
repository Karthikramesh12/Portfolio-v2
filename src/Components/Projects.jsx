import React, { useEffect, useRef, useState } from 'react';
import './Projects.css';

const Projects = () => {
  const containerRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const projectData = [
    {
      logo: "https://cdn.prod.website-files.com/67a6d23cd1f672ae9697c3f9/67ae40b881cddf62c6eb8617_triangle%20quad2.svg",
      heading: "Custom Machinery Design",
      description: "Innovative design and development of custom machinery, tailored to meet unique manufacturing needs.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      logo: "https://cdn.prod.website-files.com/67a6d23cd1f672ae9697c3f9/67ae40b881cddf62c6eb8617_triangle%20quad2.svg",
      heading: "Industrial Automation",
      description: "Cutting-edge automation solutions that streamline production processes and increase efficiency across industries.",
      image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      logo: "https://cdn.prod.website-files.com/67a6d23cd1f672ae9697c3f9/67ae40b881cddf62c6eb8617_triangle%20quad2.svg",
      heading: "Precision Engineering",
      description: "High-precision manufacturing solutions designed to meet the most demanding technical specifications and quality standards.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      logo: "https://cdn.prod.website-files.com/67a6d23cd1f672ae9697c3f9/67ae40b881cddf62c6eb8617_triangle%20quad2.svg",
      heading: "Smart Manufacturing",
      description: "IoT-enabled manufacturing systems that provide real-time monitoring and intelligent process optimization.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId = null;

    const updateScroll = () => {
  const scrollY = window.scrollY;
  const containerTop = container.offsetTop;
  const containerHeight = container.offsetHeight;
  const visibleHeight = containerHeight;

  const start = containerTop;
  const end = containerTop + containerHeight - visibleHeight;

  if (scrollY >= start && scrollY <= end) {
    const progress = (scrollY - start) / (end - start);
    const slideProgress = progress * (projectData.length - 1);
    const translateY = slideProgress * 85; // use vh, not px

    if (leftContentRef.current) {
      leftContentRef.current.style.transform = `translateY(-${translateY}vh)`;
    }
    if (rightContentRef.current) {
      rightContentRef.current.style.transform = `translateY(${translateY}vh)`;
    }

    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
    if (scrollY < start) {
      if (leftContentRef.current) leftContentRef.current.style.transform = `translateY(0vh)`;
      if (rightContentRef.current) rightContentRef.current.style.transform = `translateY(0vh)`;
    }
  }
};

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    updateScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      document.body.style.overflow = 'auto';
    };
  }, [projectData.length]);

  return (
    <div
      ref={containerRef}
      className="container p-0"
      style={{ height: `${projectData.length * 85}vh` }}
    >
      <div className="row g-0 machinery-container" style={{ position: 'sticky', top: 0, height: '85vh' }}>
        {/* Left Section */}
        <div className="col-lg-6 d-flex align-items-center bg-light left-section" style={{ overflow: 'hidden' }}>
          <div
            ref={leftContentRef}
            className="container-fluid"
            style={{
              height: `${projectData.length * 85}vh`,
              display: 'flex',
              flexDirection: 'column',
              transition: isScrolling ? 'none' : 'transform 0.3s ease',
              willChange: 'transform',
              position: 'relative'
            }}
          >
            {projectData.map((project, index) => (
              <div key={index} className="row p-4 mt-4 mb-5" style={{
                height: '85vh',
                minHeight: '85vh',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center'
              }}>
                <div className="col-12">
                  <div className="logo-container mb-5">
                    <img src={project.logo} alt="Company Logo" className="logo-svg" />
                  </div>
                  <div className="content-section">
                    <h1 className="display-4 project-heading text-dark mb-4">
                      {project.heading}
                    </h1>
                    <p className="lead text-muted custom-project-desc mb-5" style={{ maxWidth: '500px' }}>
                      {project.description}
                    </p>
                    <button className="btn intro-btn">
                      Learn More <span className="arrow">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="col-lg-6 position-relative right-section" style={{ overflow: 'hidden' }}>
          <div
            ref={rightContentRef}
            style={{
              height: `${projectData.length * 85}vh`,
              display: 'flex',
              flexDirection: 'column',
              transition: isScrolling ? 'none' : 'transform 0.3s ease',
              willChange: 'transform',
              position: 'relative'
            }}
          >
            {projectData.map((project, index) => (
              <div key={index} className="purple-bg-section d-flex align-items-center justify-content-center" style={{
                height: '85vh',
                minHeight: '85vh',
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
