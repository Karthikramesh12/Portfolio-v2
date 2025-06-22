import './Intro.css';

export default function Intro() {
  return (
    <section className="container-fluid intro-section">
      <div className="row g-4">
        <div className="col-12 col-lg-4 d-flex align-items-start justify-content-start">
          <p className="intro-label mb-0">Introduction</p>
        </div>
        <div className="col-12 col-lg-8 intro-content">
          <h1 className="intro-text">
            At <span className="fw-medium">Asteria</span>, we design and implement tailored solutions{' '}
            <span className="highlight">to optimize manufacturing workflows</span>,
            improve product quality, and reduce costs.
          </h1>
          <button className="btn intro-btn mt-3 mt-md-4">
            About Us <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}