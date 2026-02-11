import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import paths from '../routes/paths';
import './HomePage.css';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { user_id?: string; email?: string; name?: string } | null;
  const userName = state?.name || 'Abcd';
  const userInitial = userName.trim().charAt(0).toUpperCase() || 'U';
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);
  const [isRefreshLoading, setIsRefreshLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Updated 1 hr ago');
  const balances = [
    { label: 'Primary Account', amount: '₹ 48,920' },
    { label: 'Salary Account', amount: '₹ 92,640' },
  ];
  const [activeBalanceIndex, setActiveBalanceIndex] = useState(0);

  const handleBalanceReveal = () => {
    if (isBalanceVisible || isBalanceLoading) {
      return;
    }
    setIsBalanceLoading(true);
    window.setTimeout(() => {
      setIsBalanceVisible(true);
      setIsBalanceLoading(false);
    }, 700);
  };

  const handleBalanceRefresh = () => {
    if (isRefreshLoading) {
      return;
    }
    setIsRefreshLoading(true);
    window.setTimeout(() => {
      setLastUpdated('Updated just now');
      setIsRefreshLoading(false);
    }, 700);
  };

  const handleBalanceSwitch = () => {
    if (isBalanceLoading) {
      return;
    }
    setIsBalanceLoading(true);
    setIsBalanceVisible(false);
    window.setTimeout(() => {
      setActiveBalanceIndex((prev) => (prev + 1) % balances.length);
      setIsBalanceLoading(false);
    }, 700);
  };

  return (
    <div className="home-page">
      <Sidebar />
      <div className="home-main">
        <div className="home-content">
          <section className="hero-section">
            <div className="hero-header">
              <div className="hero-text">
                <h1 className="home-title">
                  {state?.name ? `Welcome ${state.name}` : 'Welcome'}
                </h1>
                <p className="home-subtitle">Your secure facial recognition payment platform</p>
                <div className="home-badges">
                  {state?.email && (
                    <span className="info-pill">Logged in as {state.email}</span>
                  )}
                  {state?.user_id && (
                    <span className="info-pill">User ID {state.user_id}</span>
                  )}
                </div>
                <div className="hero-cards">
                  <div className="hero-card balance-card">
                    <div className="balance-content">
                      <div className="balance-main">
                        <div className="balance-header">
                          <p className="card-label">
                            Available Balance
                            <span className="balance-header-meta">
                              &nbsp;&nbsp;•&nbsp;&nbsp; {balances[activeBalanceIndex].label}
                            </span>
                          </p>
                        </div>
                        <p className={`card-value ${isBalanceLoading ? 'balance-loading' : ''}`}>
                          {isBalanceLoading
                            ? 'Loading...'
                            : isBalanceVisible
                              ? balances[activeBalanceIndex].amount
                              : 'View Balance'}
                        </p>
                        <p className="card-subtitle">{lastUpdated}</p>
                        <div className="balance-dots" aria-hidden="true">
                          {balances.map((balance, index) => (
                            <span
                              key={balance.label}
                              className={`balance-dot ${index === activeBalanceIndex ? 'active' : ''}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="balance-side">
                        <button
                          className="balance-icon-button"
                          type="button"
                          onClick={handleBalanceSwitch}
                          aria-label="Switch balance card"
                        >
                          <span className="balance-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M16 3h5v5"/>
                              <path d="M21 3 15 9"/>
                              <path d="M8 21H3v-5"/>
                              <path d="M3 21l6-6"/>
                            </svg>
                          </span>
                        </button>
                        <button
                          className="balance-icon-button"
                          type="button"
                          onClick={handleBalanceRefresh}
                          aria-label="Refresh balance"
                          disabled={isRefreshLoading}
                        >
                          <span className="balance-icon">
                            <svg className={isRefreshLoading ? 'spin' : ''} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="23 4 23 10 17 10"/>
                              <polyline points="1 20 1 14 7 14"/>
                              <path d="M3.5 9a9 9 0 0 1 14.1-3.36L23 10"/>
                              <path d="M20.5 15a9 9 0 0 1-14.1 3.36L1 14"/>
                            </svg>
                          </span>
                        </button>
                        <button
                          className="balance-icon-button"
                          type="button"
                          onClick={handleBalanceReveal}
                          aria-label="Show balance"
                          disabled={isBalanceLoading}
                        >
                          <span className="balance-icon">
                            {isBalanceVisible ? (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                            ) : (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.67 21.67 0 0 1 5.06-6.88"/>
                                <path d="M1 1l22 22"/>
                                <path d="M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47"/>
                                <path d="M14.12 6.88A10.94 10.94 0 0 1 23 12s-1.22 2.45-3.5 4.75"/>
                              </svg>
                            )}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="hero-card rewards-card">
                    <div className="rewards-content">
                      <div className="rewards-main">
                        <p className="card-label">Rewards</p>
                        <p className="card-value">₹ 1,240</p>
                        <p className="card-subtitle">Points this month</p>
                      </div>
                      <div className="rewards-side">
                        <span className="rewards-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="8" width="18" height="13" rx="2"/>
                            <line x1="12" y1="8" x2="12" y2="21"/>
                            <line x1="3" y1="12" x2="21" y2="12"/>
                            <path d="M7.5 8a2.5 2.5 0 1 1 0-5c2 0 4.5 5 4.5 5s2.5-5 4.5-5a2.5 2.5 0 1 1 0 5"/>
                          </svg>
                        </span>
                        <span className="rewards-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.6 5.8 21 7 14 2 9.3 9 8.5 12 2"/>
                          </svg>
                        </span>
                        <span className="rewards-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="5"/>
                            <path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hero-card security-card">
                    <div className="security-content">
                      <div className="security-main">
                        <p className="card-label">Security Status</p>
                        <p className="card-value">Biometric Shield</p>
                        <p className="card-subtitle">Face ID active</p>
                      </div>
                      <div className="security-side">
                        <span className="security-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2 4 5v6c0 5.25 3.5 9.75 8 11 4.5-1.25 8-5.75 8-11V5l-8-3z"/>
                          </svg>
                        </span>
                        <span className="security-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="6" y="11" width="12" height="9" rx="2"/>
                            <path d="M9 11V7a3 3 0 0 1 6 0v4"/>
                          </svg>
                        </span>
                        <span className="security-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="10" r="4"/>
                            <path d="M5 21a7 7 0 0 1 14 0"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-actions">
                <button
                  className="notification-button"
                  type="button"
                  onClick={() => navigate(paths.notifications)}
                  aria-label="Open notifications"
                >
                  <span className="notification-avatar" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                    </svg>
                  </span>
                </button>
                <button
                  className="profile-button"
                  type="button"
                  onClick={() => navigate(paths.settings)}
                >
                  <span className="profile-avatar" aria-hidden="true">{userInitial}</span>
                </button>
              </div>
            </div>
          </section>

          <div className="dashboard-grid">
            <div className="dashboard-left">
              <section className="quick-actions">
                <div className="section-header">
                  <h2>Quick Actions</h2>
                  <button
                    className="link-btn"
                    type="button"
                    onClick={() => navigate(paths.services)}
                  >
                    View all
                  </button>
                </div>
                <div className="actions-grid">
                  <button className="action-card" type="button">
                    <span className="action-label">Send Money</span>
                    <span className="action-icon action-icon--large" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 18V6"/>
                        <polyline points="7 11 12 6 17 11"/>
                      </svg>
                    </span>
                  </button>
                  <button className="action-card" type="button">
                    <span className="action-label">Request Money</span>
                    <span className="action-icon action-icon--large" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 6v12"/>
                        <polyline points="7 13 12 18 17 13"/>
                      </svg>
                    </span>
                  </button>
                  <button className="action-card" type="button">
                    <span className="action-label">Scan & Pay</span>
                    <span className="action-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                      </svg>
                    </span>
                  </button>
                  <button
                    className="action-card"
                    type="button"
                    onClick={() => navigate(paths.bankTransfer)}
                  >
                    <span className="action-label">Bank Transfer</span>
                    <span className="action-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-6 9 6"/>
                        <rect x="4" y="9" width="16" height="10" rx="1"/>
                        <path d="M9 9v10"/>
                        <path d="M15 9v10"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </section>

              <section className="services-section">
                <div className="section-header">
                  <h2>Services</h2>
                  <button
                    className="link-btn"
                    type="button"
                    onClick={() => navigate(paths.services)}
                  >
                    Explore services
                  </button>
                </div>
                <div className="services-grid">
                  <button
                    className="service-card"
                    type="button"
                    onClick={() => navigate(paths.services)}
                  >
                    <div className="service-icon" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h12l4 4v12a2 2 0 0 1-2 2H4z" />
                        <path d="M16 4v4h4" />
                        <path d="M8 13h8" />
                        <path d="M8 17h6" />
                      </svg>
                    </div>
                    <div>
                      <p className="service-title">Bill Payments</p>
                      <p className="service-subtitle">Electricity, water, mobile recharges</p>
                    </div>
                  </button>
                  <button
                    className="service-card"
                    type="button"
                    onClick={() => navigate(paths.services)}
                  >
                    <div className="service-icon" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="5" width="18" height="12" rx="2" />
                        <path d="M8 21h8" />
                        <path d="M12 17v4" />
                      </svg>
                    </div>
                    <div>
                      <p className="service-title">Subscription Hub</p>
                      <p className="service-subtitle">Track and manage recurring bills</p>
                    </div>
                  </button>
                  <button
                    className="service-card"
                    type="button"
                    onClick={() => navigate(paths.services)}
                  >
                    <div className="service-icon" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 10l18-4-4 12-6-3-4 4 1-5-5-4z" />
                      </svg>
                    </div>
                    <div>
                      <p className="service-title">Travel & Tickets</p>
                      <p className="service-subtitle">Book tickets and trips instantly</p>
                    </div>
                  </button>
                  <button
                    className="service-card"
                    type="button"
                    onClick={() => navigate(paths.services)}
                  >
                    <div className="service-icon" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 6h16l-2 4H6L4 6z" />
                        <path d="M6 10v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8" />
                        <path d="M9 14h6" />
                      </svg>
                    </div>
                    <div>
                      <p className="service-title">Merchant Pay</p>
                      <p className="service-subtitle">Pay at stores with face ID</p>
                    </div>
                  </button>
                </div>
              </section>

              <section className="charts-grid">
                <div className="chart-card">
                  <div className="section-header">
                    <h2>Spending Trend</h2>
                    <span className="trend-chip trend-up">+14%</span>
                  </div>
                  <svg className="line-chart" viewBox="0 0 300 140">
                    <defs>
                      <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(79, 70, 229, 0.35)" />
                        <stop offset="100%" stopColor="rgba(79, 70, 229, 0)" />
                      </linearGradient>
                    </defs>
                    <polyline
                      points="0,110 40,95 80,105 120,70 160,78 200,50 240,62 280,40 300,45"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <polygon
                      points="0,140 0,110 40,95 80,105 120,70 160,78 200,50 240,62 280,40 300,45 300,140"
                      fill="url(#lineFill)"
                    />
                  </svg>
                  <div className="chart-footer">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
                <div className="chart-card">
                  <div className="section-header">
                    <h2>Payment Volume</h2>
                    <span className="trend-chip trend-neutral">Stable</span>
                  </div>
                  <div className="bar-chart">
                    <div className="bar" style={{ height: '60%' }}>
                      <span>60%</span>
                    </div>
                    <div className="bar" style={{ height: '78%' }}>
                      <span>78%</span>
                    </div>
                    <div className="bar" style={{ height: '52%' }}>
                      <span>52%</span>
                    </div>
                    <div className="bar" style={{ height: '90%' }}>
                      <span>90%</span>
                    </div>
                    <div className="bar" style={{ height: '70%' }}>
                      <span>70%</span>
                    </div>
                  </div>
                  <div className="chart-footer">
                    <span>UPI</span>
                    <span>Cards</span>
                    <span>Wallet</span>
                    <span>Bank</span>
                    <span>QR</span>
                  </div>
                </div>
              </section>
            </div>

            <div className="dashboard-right">
              <div className="dashboard-cards">
                <div className="dashboard-card dashboard-card--summary">
                  <div className="dashboard-card-row dashboard-card-row--summary">
                    <div className="card-icon card-icon--summary" aria-hidden="true">
                      ₹
                    </div>
                    <div className="card-content">
                      <div className="card-head">
                        <h3>Total Spent</h3>
                        <span className="trend-chip trend-up">+12%</span>
                      </div>
                      <p className="card-value">₹ 84,560</p>
                      <p className="card-label">This month</p>
                    </div>
                  </div>
                </div>
                <div className="dashboard-card dashboard-card--summary">
                  <div className="dashboard-card-row dashboard-card-row--summary">
                    <div className="card-icon card-icon--summary" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                        <line x1="7" y1="15" x2="12" y2="15" />
                      </svg>
                    </div>
                    <div className="card-content">
                      <div className="card-head">
                        <h3>Transactions</h3>
                        <span className="trend-chip trend-up">+8%</span>
                      </div>
                      <p className="card-value">124</p>
                      <p className="card-label">This Month</p>
                    </div>
                  </div>
                </div>
                <div className="dashboard-card dashboard-card--summary">
                  <div className="dashboard-card-row dashboard-card-row--summary">
                    <div className="card-icon card-icon--summary" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                        <polyline points="10 17 15 12 10 7" />
                        <line x1="15" y1="12" x2="3" y2="12" />
                      </svg>
                    </div>
                    <div className="card-content">
                      <div className="card-head">
                        <h3>Login Count</h3>
                        <span className="trend-chip trend-up">+6%</span>
                      </div>
                      <p className="card-value">3,420</p>
                      <p className="card-label">Logins this month</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="recent-activity">
                <div className="section-header">
                  <h2>Spending Insights</h2>
                  <button className="link-btn" type="button">View report</button>
                </div>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 17 9 11 13 15 21 7" />
                        <polyline points="21 7 15 7 15 13" />
                      </svg>
                    </div>
                    <div className="activity-details">
                      <p className="activity-title">Top Category</p>
                      <p className="activity-time">Utilities & Bills</p>
                    </div>
                    <span className="status-pill status-success">42%</span>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div className="activity-details">
                      <p className="activity-title">Most Active Day</p>
                      <p className="activity-time">Saturday</p>
                    </div>
                    <span className="status-pill status-info">Peak</span>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                        <line x1="7" y1="15" x2="12" y2="15" />
                      </svg>
                    </div>
                    <div className="activity-details">
                      <p className="activity-title">Largest Transfer</p>
                      <p className="activity-time">₹ 18,200</p>
                    </div>
                    <span className="status-pill status-warning">Bank</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
