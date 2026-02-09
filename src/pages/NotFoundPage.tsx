import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from '../routes/paths';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleGoHome = () => {
    if (isRedirecting) {
      return;
    }
    setIsRedirecting(true);
    setTimeout(() => {
      navigate(paths.home);
    }, 1200);
  };

  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-brand">
          <div className="not-found-logo" aria-hidden="true">
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
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
              <circle cx="20" cy="4" r="2" fill="currentColor" />
            </svg>
          </div>
          <p className="not-found-app-title">TrustFace</p>
        </div>
        <p className="not-found-code">404</p>
        <h1 className="not-found-title">Page not found</h1>
        <p className="not-found-message">
          We could not find that page. The address might be mistyped or no longer available.
        </p>
        {/* <p className="not-found-hint">Click below to return to Home.</p> */}
        <button
          type="button"
          className="not-found-action"
          onClick={handleGoHome}
          disabled={isRedirecting}
        >
          {isRedirecting ? (
            <span className="not-found-loading">
              <span className="loading-spinner" />
              Redirecting...
            </span>
          ) : (
            'Go to Home'
          )}
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
