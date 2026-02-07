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
          <div className="logo-section">
            <div className="landing-logo-illustration">
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
            </div>
            <h1 className="app-title">TrustFace</h1>
            <p className="app-tagline">Secure Payments with Face Recognition</p>
          </div>

          <div className="features-section">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure</h3>
              <p>Advanced face recognition technology for secure transactions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast</h3>
              <p>Quick and seamless payment experience without PINs</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👤</div>
              <h3>Personalized</h3>
              <p>Age-based UI customization for better user experience</p>
            </div>
          </div>

          <div className="cta-section">
            <button 
              type="button"
              className="start-button" 
              onClick={handleGetStarted}
            >
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
            <p className="cta-subtitle">Experience the future of secure payments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
