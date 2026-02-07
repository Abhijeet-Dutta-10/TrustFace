import { useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import './NotificationsPage.css';

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'security' | 'payments' | 'account'>('all');

  const notifications = [
    {
      id: 'security-1',
      category: 'security',
      title: 'Security check completed',
      subtitle: 'Face ID verification approved for ₹ 12,480.',
      time: 'Just now',
      status: 'Verified',
      statusClass: 'status-success',
      isNew: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      ),
    },
    {
      id: 'payments-1',
      category: 'payments',
      title: 'Payment processed',
      subtitle: 'Merchant payment to SmartMart was completed.',
      time: '12 minutes ago',
      status: 'Completed',
      statusClass: 'status-info',
      isNew: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="9" y1="21" x2="9" y2="9"/>
        </svg>
      ),
    },
    {
      id: 'account-1',
      category: 'account',
      title: 'Profile update required',
      subtitle: 'Complete your KYC to unlock higher limits.',
      time: '1 hour ago',
      status: 'Action',
      statusClass: 'status-warning',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
    {
      id: 'security-2',
      category: 'security',
      title: 'Spend insights ready',
      subtitle: 'Weekly spending report is now available.',
      time: 'Yesterday',
      status: 'Insight',
      statusClass: 'status-neutral',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
    },
  ];

  const filteredNotifications = useMemo(() => {
    if (activeTab === 'all') {
      return notifications;
    }
    return notifications.filter((item) => item.category === activeTab);
  }, [activeTab, notifications]);

  return (
    <div className="notifications-page">
      <Sidebar />
      <div className="notifications-main">
        <div className="notifications-content">
          <div className="notifications-hero">
            <div>
              <h1>Notifications</h1>
              <p>Stay updated with recent activity and alerts.</p>
            </div>
            <div className="notifications-actions">
              <button className="ghost-btn" type="button">Mark all read</button>
              <button className="primary-btn" type="button">Notification settings</button>
            </div>
          </div>

          <div className="notifications-toolbar">
            <div className="notifications-tabs">
              <button
                className={`tab-button ${activeTab === 'all' ? 'is-active' : ''}`}
                type="button"
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button
                className={`tab-button ${activeTab === 'security' ? 'is-active' : ''}`}
                type="button"
                onClick={() => setActiveTab('security')}
              >
                Security
              </button>
              <button
                className={`tab-button ${activeTab === 'payments' ? 'is-active' : ''}`}
                type="button"
                onClick={() => setActiveTab('payments')}
              >
                Payments
              </button>
              <button
                className={`tab-button ${activeTab === 'account' ? 'is-active' : ''}`}
                type="button"
                onClick={() => setActiveTab('account')}
              >
                Account
              </button>
            </div>
            <div className="notifications-search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input type="text" placeholder="Search notifications" />
            </div>
          </div>

          <div className="notifications-grid">
            {filteredNotifications.map((item) => (
              <div key={item.id} className={`notification-card ${item.isNew ? 'is-new' : ''}`}>
                <div className="notification-icon">{item.icon}</div>
                <div className="notification-text">
                  <p className="notification-title">{item.title}</p>
                  <p className="notification-subtitle">{item.subtitle}</p>
                  <p className="notification-time">{item.time}</p>
                </div>
                <div className="notification-meta">
                  {item.isNew && <span className="notification-badge">New</span>}
                  <span className={`notification-status ${item.statusClass}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
