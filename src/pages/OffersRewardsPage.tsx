import { useRef, useState } from 'react';
import Sidebar from '../components/Sidebar';
import './OffersRewardsPage.css';
import { useNavigate } from 'react-router-dom';

const OffersRewardsPage = () => {
  const navigate = useNavigate();
  const [isReferralCopied, setIsReferralCopied] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);
  const referralCode = 'TFACE150';
  const rewardHighlights = [
    {
      id: 'points',
      label: 'Reward Points',
      value: '2,460',
      helper: 'Available to redeem',
      accent: 'accent-indigo',
    },
    {
      id: 'cashback',
      label: 'Total Cashback Earned',
      value: '₹ 1,840',
      helper: 'Since 2026',
      accent: 'accent-emerald',
    },
    {
      id: 'streak',
      label: 'Monthly Rewards',
      value: '₹ 1240',
      helper: 'Rewards earned this month',
      accent: 'accent-amber',
    },
  ];

  const scratchCards = [
    {
      id: 'scratch-1',
      title: 'Next scratch card',
      subtitle: 'Unlocks after 2 payments',
      badge: 'Pending',
    },
    {
      id: 'scratch-2',
      title: 'Bill pay bonus',
      subtitle: 'Earn 5% cashback this weekend',
      badge: 'Upcoming',
    },
    {
      id: 'scratch-3',
      title: 'Grocery boost',
      subtitle: '2x points on your next grocery spend',
      badge: 'Queued',
    },
  ];

  const offerCards = [
    {
      id: 'offer-1',
      merchant: 'Zomato',
      title: 'Flat ₹120 off on dining',
      // subtitle: 'Min spend ₹499 • Use FacePay',
      expiry: 'Expires in 2 days',
      tag: 'Dining',
    },
    {
      id: 'offer-2',
      merchant: 'Amazon',
      title: '10% cashback on electronics',
      // subtitle: 'Upto ₹750 on card payments',
      expiry: 'Expires in 5 days',
      tag: 'Shopping',
    },
    {
      id: 'offer-3',
      merchant: 'Uber',
      title: '₹60 off on 3 rides',
      // subtitle: 'Use UPI ID to pay',
      expiry: 'Expires in 10 days',
      tag: 'Travel',
    },
    {
      id: 'offer-4',
      merchant: 'Airtel',
      title: '5% cashback on recharges',
      // subtitle: 'Valid on monthly plans',
      expiry: 'Expires in 12 days',
      tag: 'Bills',
    },
  ];

  const rewardTier = {
    id: 'tier-gold',
    title: 'Gold',
    subtitle: 'Priority cashbacks',
    progress: 65,
    hint: 'Spend ₹18,200 more to reach Platinum',
  };

  const redemptionOptions = [
    {
      id: 'redeem-1',
      title: 'Gift Cards',
      description: 'Flipkart, Amazon, Swiggy & more',
    },
    {
      id: 'redeem-2',
      title: 'Bill Credits',
      description: 'Instant utility bill discounts',
    },
    {
      id: 'redeem-3',
      title: 'Travel Vouchers',
      description: 'Book flights and stays using points',
    },
  ];

  return (
    <div className="offers-page">
      <Sidebar />
      <div className="offers-main">
        <div className="offers-content">
          <header className="offers-hero">
            <div>
              {/* <p className="offers-eyebrow">Offers & Rewards</p> */}
              <h1 className="offers-title">Rewards</h1>
              {/* <p className="offers-subtitle">
                Track your points, unlock scratch cards, and grab curated offers
                tailored for you.
              </p> */}
            </div>
            <div className="offers-actions">
              <button className="ghost-btn" type="button" onClick={() => navigate('/transactions-history')}>
                View history
              </button>
              <button className="secondary-btn" type="button">
                Redeem points
              </button>
              <button className="primary-btn" type="button">
                Earn more
              </button>
            </div>
          </header>

          <section className="rewards-summary">
            {rewardHighlights.map((item) => (
              <div key={item.id} className={`summary-card ${item.accent}`}>
                <div className="summary-card-header">
                  <p>{item.label}</p>
                </div>
                <h3>{item.value}</h3>
                <p className="summary-helper">{item.helper}</p>
              </div>
            ))}
          </section>

          <div className="rewards-grid">
            <section className="rewards-section scratch-cards">
              <div className="section-header">
                <div>
                  <h2>Upcoming Rewards</h2>
                  <p>Track what you will unlock next</p>
                </div>
                <button className="link-btn" type="button">
                  View all
                </button>
              </div>
              <div className="scratch-card-list">
                {scratchCards.map((card) => (
                  <div key={card.id} className="scratch-card">
                    <div>
                      <p className="scratch-title">{card.title}</p>
                      <p className="scratch-subtitle">{card.subtitle}</p>
                    </div>
                    <span className="scratch-badge">{card.badge}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rewards-section rewards-tier">
              <div className="section-header">
                <div>
                  <h2>Reward Level</h2>
                  <p>Reach the next tier for bigger benefits</p>
                </div>
                <button className="link-btn" type="button">
                  How it works
                </button>
              </div>
              <div className="tier-list">
                <div className="tier-card">
                  <div className="tier-header">
                    <div>
                      <p className="tier-title">{rewardTier.title}</p>
                      <p className="tier-subtitle">{rewardTier.subtitle}</p>
                    </div>
                    <span className="tier-progress-label">{rewardTier.progress}%</span>
                  </div>
                  <div className="tier-progress">
                    <span style={{ width: `${rewardTier.progress}%` }} />
                  </div>
                  <p className="tier-hint">{rewardTier.hint}</p>
                </div>
              </div>
              <div className="tier-timeline progress-gold" aria-label="Reward tier timeline">
                <div className="tier-node completed">
                  <span className="tier-dot" />
                  <span className="tier-name">Bronze</span>
                </div>
                <div className="tier-node completed">
                  <span className="tier-dot" />
                  <span className="tier-name">Silver</span>
                </div>
                <div className="tier-node current">
                  <span className="tier-dot" />
                  <span className="tier-name">Gold</span>
                </div>
                <div className="tier-node">
                  <span className="tier-dot" />
                  <span className="tier-name">Platinum</span>
                </div>
                <div className="tier-node">
                  <span className="tier-dot" />
                  <span className="tier-name">Diamond</span>
                </div>
              </div>
              <div className="tier-footer">
                <div className="tier-footer-item">
                  <p>Next tier reward</p>
                  <h4>₹ 250 reward</h4>
                </div>
                <div className="tier-footer-item">
                  <p>Current Offer</p>
                  <h4>5% off</h4>
                </div>
              </div>
            </section>
          </div>

          <section className="rewards-section offers-section">
            <div className="section-header">
              <div>
                <h2>Your Rewards</h2>
                <p>Redeem rewards and offers from your favorite brands</p>
              </div>
              <button className="link-btn" type="button">
                Filter
              </button>
            </div>
            <div className="offers-list">
              {offerCards.map((offer) => (
                <div key={offer.id} className="offer-card">
                  <div className="offer-meta">
                    <span className="offer-tag">{offer.tag}</span>
                    <span className="offer-expiry">{offer.expiry}</span>
                  </div>
                  <div className="offer-body">
                    <div className="offer-content">
                      <p className="offer-merchant">{offer.merchant}</p>
                      <h3>{offer.title}</h3>
                    </div>
                    <div className="offer-footer">
                      <p className="offer-subtitle">View Details</p>
                      <button className="primary-btn small" type="button">
                        Activate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rewards-section redemption-section">
            <div className="section-header">
              <div>
                <h2>Redeem Your Points</h2>
                <p>Choose how you want to use your rewards</p>
              </div>
              <button className="link-btn" type="button">
                See catalogue
              </button>
            </div>
            <div className="redemption-grid">
              {redemptionOptions.map((option) => (
                <div key={option.id} className="redemption-card">
                  <div className="redemption-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" />
                      <path d="M22 10H2" />
                    </svg>
                  </div>
                  <div>
                    <p className="redemption-title">{option.title}</p>
                    <p className="redemption-subtitle">{option.description}</p>
                  </div>
                  <button className="ghost-btn small" type="button">
                    Redeem
                  </button>
                </div>
              ))}
            </div>
            <div className="referral-card">
              <div>
                <p className="referral-title">Invite friends & earn ₹150</p>
                <p className="referral-subtitle">
                  Share your referral code and get cashback on their first payment.
                </p>
              </div>
              <div className="referral-actions">
                <span className="referral-code">{isReferralCopied ? 'Copied' : referralCode}</span>
                <button
                  className="referral-copy-btn"
                  type="button"
                  aria-label="Copy referral code"
                  onClick={async () => {
                    if (copyTimeoutRef.current) {
                      window.clearTimeout(copyTimeoutRef.current);
                    }
                    try {
                      await navigator.clipboard.writeText(referralCode);
                      setIsReferralCopied(true);
                      copyTimeoutRef.current = window.setTimeout(() => {
                        setIsReferralCopied(false);
                      }, 2000);
                    } catch {
                      setIsReferralCopied(false);
                    }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
                <button className="primary-btn small" type="button">
                  Share
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OffersRewardsPage;
