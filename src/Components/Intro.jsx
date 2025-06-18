import './Intro.css';

export default function Intro() {
  return (
    <section className="container-fluid intro-section">
      <div className="row">
        <div className="col-md-4 d-flex align-items-start justify-content-start">
          <p className="intro-label">Introduction</p>
        </div>
        <div className="col-md-8 intro-content">
          <h1 className="intro-text">
            At <span className="fw-medium">Asteria</span>, we design and implement tailored solutions{' '}
            <span className="highlight">to optimize manufacturing workflows</span>,
            improve product quality, and reduce costs.
          </h1>
          <button className="btn intro-btn mt-4">
            About Us <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
