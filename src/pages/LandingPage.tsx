import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleGetStarted = () => {
    setIsExiting(true);
    // Prevent body scrolling during transition
    document.body.classList.add('page-transitioning');
    // Wait for exit animation to complete before navigating
    setTimeout(() => {
      navigate('/auth');
      // Re-enable scrolling after navigation
      setTimeout(() => {
        document.body.classList.remove('page-transitioning');
      }, 600);
    }, 500); // Match the animation duration
  };

  return (
    <div className={`landing-page ${isExiting ? 'page-exit' : ''}`}>
      <div className="landing-container">
        <div className="landing-content">
          <header className="landing-header">
            <div className="brand-pill">
              <div className="brand-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path
                    d="M6 21C6 17 9 14 12 14C15 14 18 17 18 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M2 12L4 10L6 12L10 8L12 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <circle cx="20" cy="4" r="2" fill="currentColor"/>
                </svg>
              </div>
              <span className="brand-text">TrustFace</span>
            </div>
            {/* <button type="button" className="header-cta" onClick={handleGetStarted}>
              Get Started
            </button> */}
          </header>

          <section className="hero-section">
            <div className="hero-left">
              <span className="hero-badge">Secure · Fast · Face-Verified</span>
              <h1 className="hero-title">Payments secured by your face.</h1>
              <p className="hero-subtitle">
                TrustFace delivers payments using secure facial recognition,
                designed for speed, safety, and a personalized experience.
              </p>
              <div className="hero-actions">
                <button type="button" className="start-button" onClick={handleGetStarted}>
                  Get Started
                  <svg
                    className="start-button-icon"
                    viewBox="0 0 16 19"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                      className="start-button-icon-path"
                    />
                  </svg>
                </button>
                <button type="button" className="secondary-button" onClick={handleGetStarted}>
                  View Demo
                </button>
              </div>
              <div className="stats-row">
                <div className="stat-card">
                  <p className="stat-value">99.9%</p>
                  <p className="stat-label">Face match accuracy</p>
                </div>
                <div className="stat-card">
                  <p className="stat-value">2s</p>
                  <p className="stat-label">Average verification</p>
                </div>
                <div className="stat-card">
                  <p className="stat-value">256-bit</p>
                  <p className="stat-label">Encrypted payloads</p>
                </div>
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-visual">
                <div className="landing-logo-large">
                  <svg
                    width="200"
                    height="200"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path
                      d="M6 21C6 17 9 14 12 14C15 14 18 17 18 21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M2 12L4 10L6 12L10 8L12 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <circle cx="20" cy="4" r="2" fill="currentColor"/>
                  </svg>
                </div>
                <div className="hero-glow"></div>
              </div>
              <div className="trust-row">
                <span>Built Using Amazon Web Services</span>
                <div className="trust-logos">
                  <span>Rekognition</span>
                  <span>Lambda</span>
                  <span>S3</span>
                  <span>API Gateway</span>
                </div>
              </div>
            </div>
          </section>


        </div>
      </div>
    </div>
  );
};

export default LandingPage;
