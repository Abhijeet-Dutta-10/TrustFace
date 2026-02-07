import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './ServicesPage.css';

const services = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10h18" />
        <path d="M5 10V7l7-4 7 4v3" />
        <path d="M4 10v8" />
        <path d="M20 10v8" />
        <path d="M9 14h6" />
      </svg>
    ),
    name: 'Bank Transfer',
    category: 'Banking',
    description: 'Instant transfers between linked bank accounts with full audit trails.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h14" />
        <path d="M13 8l4 4-4 4" />
        <path d="M21 6v12" />
      </svg>
    ),
    name: 'Self Transfer',
    category: 'Banking',
    description: 'Move funds between your own accounts securely and in real time.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <line x1="11" y1="18" x2="13" y2="18" />
      </svg>
    ),
    name: 'Mobile Recharge',
    category: 'Telecom',
    description: 'Top up prepaid numbers instantly with smart operator detection.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h12l4 4v12a2 2 0 0 1-2 2H4z" />
        <path d="M16 4v4h4" />
        <path d="M8 13h8" />
        <path d="M8 17h6" />
      </svg>
    ),
    name: 'Utility Bill Payments',
    category: 'Utilities',
    description: 'Pay electricity, water, gas, and broadband bills in a single flow.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="12" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
    name: 'OTT / DTH Subscription Payment',
    category: 'Entertainment',
    description: 'Renew streaming and DTH subscriptions with auto-reminders.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10l18-4-4 12-6-3-4 4 1-5-5-4z" />
      </svg>
    ),
    name: 'Travel Ticket Booking Payments',
    category: 'Travel',
    description: 'Complete bookings with secure card and biometric confirmation.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="6" y1="15" x2="10" y2="15" />
      </svg>
    ),
    name: 'Credit Card Bill Payment',
    category: 'Cards',
    description: 'Schedule on-time payments and avoid late fees effortlessly.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h16" />
        <path d="M6 7l2-3h8l2 3" />
        <path d="M6 7v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
        <path d="M9 13h6" />
      </svg>
    ),
    name: 'Loan EMI Payment',
    category: 'Loans',
    description: 'Pay EMIs with verified identity and receipt tracking.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16l-2 4H6L4 6z" />
        <path d="M6 10v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8" />
        <path d="M9 14h6" />
      </svg>
    ),
    name: 'Merchant Payments',
    category: 'Commerce',
    description: 'Pay verified merchants with instant confirmation and receipts.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <path d="M14 14h7v7h-7z" />
        <path d="M15 18h3" />
      </svg>
    ),
    name: 'UPI / QR Code Payments',
    category: 'UPI',
    description: 'Scan and pay with trusted biometric verification.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h14a3 3 0 0 1 3 3v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" />
        <path d="M4 7V5a2 2 0 0 1 2-2h13" />
        <circle cx="17" cy="13" r="1" />
      </svg>
    ),
    name: 'Wallet Top-Up',
    category: 'Wallets',
    description: 'Add funds to digital wallets using secure funding sources.',
  },
];

const ServicesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return services;
    }
    return services.filter((service) =>
      `${service.name} ${service.category} ${service.description}`
        .toLowerCase()
        .includes(query)
    );
  }, [searchQuery]);

  const handleServiceClick = (serviceName: string) => {
    if (serviceName === 'Bank Transfer') {
      navigate('/services/bank-transfer');
    }
  };

  return (
    <div className="services-page">
      <Sidebar />
      <div className="services-main">
        <div className="services-content">
          <header className="services-hero">
            <div>
              <p className="services-eyebrow">Services</p>
            </div>
            <div className="services-heading-card">
              <p className="heading-label">Services</p>
              <div className="services-search">
                <div className="services-search-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search services"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
            </div>
          </header>

          <section className="services-grid">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <button
                  className="service-card"
                  key={service.name}
                  type="button"
                  aria-label={`${service.name} service`}
                  onClick={() => handleServiceClick(service.name)}
                >
                  <div className="service-header">
                    <div className="service-icon">
                      <span>{service.icon}</span>
                    </div>
                    <div>
                      <p className="service-category">{service.category}</p>
                      <h3 className="service-name">{service.name}</h3>
                    </div>
                  </div>
                  <p className="service-description">{service.description}</p>
                  {/* <p className="service-cta">Ready to use</p> */}
                </button>
              ))
            ) : (
              <div className="services-empty">
                No services found for "{searchQuery.trim()}". Choose from the available services.
              </div>
            )}
          </section>

          <section className="services-support">
            <div>
              <h2>Need help choosing a service?</h2>
              <p>
                Our support team is available 24/7 to guide your payment flow
                and ensure seamless verification.
              </p>
            </div>
            <button className="services-support-button" type="button">
              Contact Support
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
