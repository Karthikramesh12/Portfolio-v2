import './Services.css';
import { useEffect, useRef } from 'react';

function Services() {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);

  const servicesData = [
    {
      id: 1,
      title: "Business Strategy",
      description: "Tailored strategies that align business goals with digital growth."
    },
    {
      id: 2,
      title: "Visual Direction",
      description: "We create cohesive and timeless brand identities that capture your vision."
    },
    {
      id: 3,
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies and best practices."
    },
    {
      id: 4,
      title: "Digital Marketing",
      description: "Comprehensive digital marketing solutions to boost your online presence and reach."
    },
    {
      id: 5,
      title: "UI/UX Design",
      description: "User-centered design approach that creates intuitive and engaging digital experiences."
    },
    {
      id: 6,
      title: "Brand Identity",
      description: "Complete brand development from concept to implementation across all touchpoints."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const background = backgroundRef.current;
      
      if (!section || !background) return;

      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionBottom = sectionRect.bottom;
      const windowHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;
      
      // Calculate the scroll progress through the section
      const scrollableDistance = sectionHeight - windowHeight;
      const scrollProgress = Math.max(0, Math.min(1, -sectionTop / scrollableDistance));
      
      if (sectionTop > 0) {
        // Section is above viewport - background at start position
        background.style.position = 'absolute';
        background.style.top = '0px';
        background.style.left = '0px';
        background.style.width = '100%';
        background.style.height = '100vh';
        background.style.zIndex = '1';
        background.style.transform = 'translate3d(0, 0, 0)';
      } else if (sectionBottom < windowHeight) {
        // Section is below viewport - background at end position
        background.style.position = 'absolute';
        background.style.top = `${scrollableDistance}px`;
        background.style.left = '0px';
        background.style.width = '100%';
        background.style.height = '100vh';
        background.style.zIndex = '1';
        background.style.transform = 'translate3d(0, 0, 0)';
      } else {
        // Section is in viewport - background is sticky/fixed
        background.style.position = 'fixed';
        background.style.top = '0px';
        background.style.left = '0px';
        background.style.width = '100%';
        background.style.height = '100vh';
        background.style.zIndex = '1';
        background.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    // Handle mouse movement for custom cursor
    const handleMouseMove = (e) => {
      const cardWrappers = document.querySelectorAll('.service-card-wrapper');
      cardWrappers.forEach(wrapper => {
        const rect = wrapper.getBoundingClientRect();
        const isHovering = (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        );
        
        if (isHovering) {
          wrapper.style.setProperty('--mouse-x', e.clientX + 'px');
          wrapper.style.setProperty('--mouse-y', e.clientY + 'px');
        }
      });
    };

    // Handle mouse enter/leave for cursor visibility
    const handleMouseEnter = (e) => {
      if (e.target.closest('.service-card-wrapper')) {
        document.body.style.cursor = 'none';
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.closest('.service-card-wrapper')) {
        document.body.style.cursor = 'default';
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial call
    handleScroll();
    
    // Add event listeners
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    window.addEventListener('resize', throttledHandleScroll, { passive: true });
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', throttledHandleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      // Reset cursor on cleanup
      document.body.style.cursor = 'default';
    };
  }, []);

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="services-background" ref={backgroundRef}></div>
      <div className="container">
        <div className="row">
        {/* Hero Section */}
        <div className="col-12 col-md-6 services-hero-row">
          <div className="col-12 services-hero">
            <div className="services-hero-content">
              <h1 className="services-title">
                OUR BEST<br />
                <span className="services-title-highlight">SERVICES!</span>
              </h1>
            </div>
          </div>
        </div>
         
        {/* Service Cards */}
        <div className="services-cards-section col-12 col-md-6">
          {servicesData.map((service, index) => (
            <div key={service.id} className={`row service-row ${index % 2 === 0 ? 'service-row-left' : 'service-row-right'}`}>
              <div className="col-lg-6 col-md-8 col-sm-10 service-card-wrapper">
                <div className="service-card">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-description">
                    {service.description}
                  </p>
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
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}

export default Services;