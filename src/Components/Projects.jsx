import { useEffect, useRef, useState } from 'react';
import './Projects.css';

function Projects() {
  const containerRef = useRef(null);
  const slidesRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const scrollPosition = useRef(0);
  const scrollAccumulator = useRef(0);
  const slideProgress = useRef(0);
  const lastScrollTime = useRef(0);
  const animationFrame = useRef(null);
  const isAnimating = useRef(false);
  const isAtBoundary = useRef(false);
  const isLocked = useRef(false);
  const isAtLastSlide = useRef(false);

  useEffect(() => {
    const totalSlides = 6;
    const SCROLL_THRESHOLD = 600;
    const COOLDOWN_TIME = 400;
    const SLIDE_TRANSITION_DURATION = 600;
    const EXIT_THRESHOLD = SCROLL_THRESHOLD * 1.5;

    // Lock vertical scrolling
    const lockScroll = () => {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('scroll-lock');
      isLocked.current = true;
    };

    // Unlock vertical scrolling
    const unlockScroll = () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('scroll-lock');
      isLocked.current = false;
    };

    const animateSlide = (targetProgress) => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      
      const startProgress = slideProgress.current;
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / SLIDE_TRANSITION_DURATION, 1);
        const easedProgress = easeInOutCubic(progress);
        
        slideProgress.current = startProgress + (targetProgress - startProgress) * easedProgress;
        updateSlidePosition();
        
        if (progress < 1) {
          animationFrame.current = requestAnimationFrame(animate);
        } else {
          isAnimating.current = false;
          const newSlide = Math.round(slideProgress.current);
          setCurrentSlide(newSlide);
          isAtBoundary.current = newSlide === 0 || newSlide === totalSlides - 1;
          isAtLastSlide.current = newSlide === totalSlides - 1;
          
          // If we reached the last slide, unlock scroll
          if (isAtLastSlide.current) {
            unlockScroll();
          } else {
            lockScroll();
          }
        }
      };
      
      animationFrame.current = requestAnimationFrame(animate);
    };

    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const handleScroll = (e) => {
      if (!isActive || !slidesRef.current || isAnimating.current) return;
      
      // If we're at the last slide and scrolling down, allow normal scrolling
      if (isAtLastSlide.current && e.deltaY > 0) {
        return;
      }
      
      // Completely prevent default scrolling behavior for other cases
      e.preventDefault();
      e.stopPropagation();
      e.returnValue = false;
      
      const now = Date.now();
      if (now - lastScrollTime.current < COOLDOWN_TIME) return;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      scrollAccumulator.current += Math.abs(e.deltaY);
      
      // Check if we're at a boundary
      const atStart = slideProgress.current <= 0;
      const atEnd = slideProgress.current >= totalSlides - 1;
      
      // If trying to scroll beyond boundaries
      if ((direction === 1 && atEnd) || (direction === -1 && atStart)) {
        // Only allow exit after accumulating enough scroll
        if (scrollAccumulator.current >= EXIT_THRESHOLD) {
          setIsActive(false);
          scrollAccumulator.current = 0;
          lastScrollTime.current = now;
          unlockScroll();
          
          // Restore normal scroll position
          if (direction === 1) {
            window.scrollTo({
              top: containerRef.current.offsetTop + containerRef.current.offsetHeight,
              behavior: 'smooth'
            });
          }
        }
        return;
      }
      
      // Normal slide change
      if (scrollAccumulator.current >= SCROLL_THRESHOLD) {
        const targetSlide = Math.max(0, Math.min(totalSlides - 1, Math.round(slideProgress.current) + direction));
        animateSlide(targetSlide);
        scrollAccumulator.current = 0;
        lastScrollTime.current = now;
      }
    };

    const updateSlidePosition = () => {
      if (!slidesRef.current) return;
      const translateX = slideProgress.current * 100;
      slidesRef.current.style.transform = `translate3d(-${translateX}vw, 0, 0)`;
    };

    const handleTouchStart = (e) => {
      if (!isActive) return;
      scrollAccumulator.current = 0;
    };

    const handleTouchMove = (e) => {
      if (!isActive || !slidesRef.current || isAnimating.current) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const touch = e.touches[0];
      const prevTouch = e.touches[1] || touch;
      const dx = touch.clientX - prevTouch.clientX;
      const dy = touch.clientY - prevTouch.clientY;
      
      // Only handle horizontal swipes
      if (Math.abs(dx) > Math.abs(dy)) {
        scrollAccumulator.current += Math.abs(dx);
        
        const direction = dx > 0 ? -1 : 1;
        const atStart = slideProgress.current <= 0;
        const atEnd = slideProgress.current >= totalSlides - 1;
        
        // Boundary check
        if ((direction === 1 && atEnd) || (direction === -1 && atStart)) {
          if (scrollAccumulator.current >= EXIT_THRESHOLD) {
            setIsActive(false);
            scrollAccumulator.current = 0;
            unlockScroll();
          }
          return;
        }
        
        if (scrollAccumulator.current >= SCROLL_THRESHOLD) {
          const targetSlide = Math.max(0, Math.min(totalSlides - 1, Math.round(slideProgress.current) + direction));
          animateSlide(targetSlide);
          scrollAccumulator.current = 0;
        }
      }
    };

    const checkContainerPosition = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const isInView = containerRect.top < windowHeight * 0.75 && 
                       containerRect.bottom > windowHeight * 0.25;
      
      if (isInView && !isActive) {
        // Entering horizontal scroll section
        setIsActive(true);
        lockScroll();
        scrollPosition.current = window.scrollY;
        
        // Snap to the container position
        window.scrollTo({
          top: container.offsetTop,
          behavior: 'smooth'
        });
      } else if (!isInView && isActive) {
        // Exiting horizontal scroll section
        setIsActive(false);
        unlockScroll();
      }
    };

    const onScroll = () => {
      checkContainerPosition();
      if (isActive && !isLocked.current && !isAtLastSlide.current) {
        lockScroll();
      }
    };

    let scrollTimeout;
    const throttledScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        onScroll();
        scrollTimeout = null;
      }, 16);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    checkContainerPosition();
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      unlockScroll();
    };
  }, [isActive]);

  // ... rest of the component code remains the same ...
  const slides = [
    {
      title: "Futuristic Lamp",
      subtitle: "Product UI/UX Design",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
      category: "01"
    },
    {
      title: "Smart Home Hub",
      subtitle: "Interactive Interface Design",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&crop=center",
      category: "02"
    },
    {
      title: "Eco-Friendly Bottle",
      subtitle: "Sustainable Product Design",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=600&fit=crop&crop=center",
      category: "03"
    },
    {
      title: "Virtual Reality Headset",
      subtitle: "Immersive Experience Design",
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800&h=600&fit=crop&crop=center",
      category: "04"
    },
    {
      title: "Minimalist Watch",
      subtitle: "Wearable Technology Design",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop&crop=center",
      category: "05"
    },
    {
      title: "Wireless Earbuds",
      subtitle: "Audio Product Design",
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c6ba35?w=800&h=600&fit=crop&crop=center",
      category: "06"
    }
  ];

  return (
    <div className="projects-container" ref={containerRef}>
      <div className="horizontal-scroll-wrapper">
        <div 
          className="slides-container" 
          ref={slidesRef}
          style={{
            display: 'flex',
            width: `${slides.length * 100}vw`,
            willChange: 'transform',
            transform: 'translate3d(0vw, 0px, 0px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className="slide"
              style={{
                width: '100vw',
                flexShrink: 0,
              }}
            >
              <div className="slide-background">
                <img src={slide.image} alt={slide.title} />
              </div>
              <div className="slide-content">
                <div className="slide-category">{slide.category}</div>
                <h2 className="slide-title">{slide.title}</h2>
                <h3 className="slide-subtitle">{slide.subtitle}</h3>
                <div className="slide-cta">
                  <button className="btn btn-outline-light">View Project</button>
                </div>
              </div>
              <div className="slide-nav">
                <div className="nav-text">Explore Our Success Stories</div>
                <div className="nav-arrow">→</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="slide-progress" style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 1000
      }}>
        {slides.map((_, index) => (
          <div
            key={index}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.3)',
              transition: 'background-color 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;