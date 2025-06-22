import React, { useEffect, useRef } from 'react';
import './Education.css';

function Education() {
  const circleRef = useRef(null);
  const rotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      targetRotationRef.current = scrollY * 0.3; // adjust multiplier as needed
    };

    const smoothRotate = () => {
      // Linear interpolation between current and target rotation
      const current = rotationRef.current;
      const target = targetRotationRef.current;
      const delta = target - current;

      rotationRef.current += delta * 0.1; // easing factor

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(-50%, -50%) rotate(${rotationRef.current}deg)`;
      }

      animationFrameRef.current = requestAnimationFrame(smoothRotate);
    };

    // Set initial style
    if (circleRef.current) {
      circleRef.current.style.transform = `translate(-50%, -50%) rotate(0deg)`;
    }

    window.addEventListener('scroll', handleScroll);
    animationFrameRef.current = requestAnimationFrame(smoothRotate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className="education-section mt-5 overflow-hidden">
      <div className="d-flex justify-content-center align-items-center">
        <h1 className='display-4 fw-custom education-heading'>Complete Manufacturing Lifecycle Support</h1>
      </div>
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-12 h-100">
            <div className="process-wrapper d-flex align-items-center justify-content-center position-relative">
              
              {/* Rotating Circles - Centered */}
              <div className="circles-container position-absolute"
                   style={{ top: '50%', left: '50%' }}
                   ref={circleRef}>
                <div className="outer-circle"></div>
                <div className="inner-circle"></div>
                <div className="connection-dot dot-top"></div>
                <div className="connection-dot dot-right"></div>
                <div className="connection-dot dot-bottom"></div>
                <div className="connection-dot dot-left"></div>
              </div>

              {/* Center Text */}
              <div className="center-content position-absolute top-50 start-50 translate-middle text-center">
                <h2>Our Process</h2>
              </div>

              {/* Process Items */}
              <div className="process-items-container position-absolute w-100 h-100">
                <div className="process-item corner-item top-left">
                  <div className="step-header">
                    <span className="diamond">◆</span>
                    <span className="step-num">01</span>
                  </div>
                  <h3 className="step-title">Design</h3>
                  <p className="step-desc">Transform your operations with expert design and development services, tailored to your unique needs.</p>
                </div>

                <div className="process-item corner-item top-right">
                  <div className="step-header">
                    <span className="diamond">◆</span>
                    <span className="step-num">02</span>
                  </div>
                  <h3 className="step-title">Implement</h3>
                  <p className="step-desc">Seamless transition to new solutions with minimal downtime, ensuring efficiency and productivity.</p>
                </div>

                <div className="process-item corner-item bottom-left">
                  <div className="step-header">
                    <span className="diamond">◆</span>
                    <span className="step-num">03</span>
                  </div>
                  <h3 className="step-title">Optimize</h3>
                  <p className="step-desc">Continuously improve performance with data-driven insights, driving efficiency, productivity, and quality.</p>
                </div>

                <div className="process-item corner-item bottom-right">
                  <div className="step-header">
                    <span className="diamond">◆</span>
                    <span className="step-num">04</span>
                  </div>
                  <h3 className="step-title">Maintain</h3>
                  <p className="step-desc">Ongoing support for peak performance and minimal downtime, with regular updates and expert maintenance.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
