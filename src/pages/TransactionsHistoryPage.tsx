import { useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import './TransactionsHistoryPage.css';

type TransactionStatus = 'completed' | 'pending' | 'failed';
type TransactionDirection = 'incoming' | 'outgoing';

interface TransactionItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  amount: string;
  direction: TransactionDirection;
  status: TransactionStatus;
  account: string;
  method: string;
  tag: string;
}

const TransactionsHistoryPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | TransactionDirection | 'failed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const transactions: TransactionItem[] = [
    {
      id: 'txn-001',
      title: 'SmartMart Superstore',
      subtitle: 'Grocery & Essentials',
      time: '08 Feb 2026 • 10:48 AM',
      amount: '₹ 2,480',
      direction: 'outgoing',
      status: 'completed',
      account: 'Primary Account',
      method: 'Face ID • UPI',
      tag: 'Daily Spend',
    },
    {
      id: 'txn-002',
      title: 'Salary Credit',
      subtitle: 'Acme Corp Payroll',
      time: '08 Feb 2026 • 09:05 AM',
      amount: '₹ 96,000',
      direction: 'incoming',
      status: 'completed',
      account: 'Salary Account',
      method: 'Bank Transfer',
      tag: 'Income',
    },
    {
      id: 'txn-003',
      title: 'TravelNest Flights',
      subtitle: 'Mumbai → Goa',
      time: '07 Feb 2026 • 08:20 PM',
      amount: '₹ 8,940',
      direction: 'outgoing',
      status: 'completed',
      account: 'Primary Account',
      method: 'Card • Visa 2456',
      tag: 'Travel',
    },
    {
      id: 'txn-004',
      title: 'TrustFace Rewards',
      subtitle: 'Weekly cashback bonus',
      time: '07 Feb 2026 • 06:10 PM',
      amount: '₹ 420',
      direction: 'incoming',
      status: 'completed',
      account: 'Primary Account',
      method: 'Rewards Wallet',
      tag: 'Rewards',
    },
    {
      id: 'txn-005',
      title: 'GreenLeaf Pharmacy',
      subtitle: 'Health & Wellness',
      time: '01 Feb 2026 • 03:15 PM',
      amount: '₹ 1,260',
      direction: 'outgoing',
      status: 'pending',
      account: 'Primary Account',
      method: 'Face ID • UPI',
      tag: 'Health',
    },
    {
      id: 'txn-006',
      title: 'NetStream Plus',
      subtitle: 'Monthly subscription',
      time: '01 Feb 2026 • 11:00 AM',
      amount: '₹ 799',
      direction: 'outgoing',
      status: 'failed',
      account: 'Primary Account',
      method: 'Card • Visa 2456',
      tag: 'Subscriptions',
    },
  ];

  const filteredTransactions = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return transactions.filter((transaction) => {
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'failed' && transaction.status === 'failed') ||
        transaction.direction === activeTab;
      const matchesSearch =
        !normalizedQuery ||
        `${transaction.title} ${transaction.subtitle} ${transaction.tag}`
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, transactions]);

  return (
    <div className="transactions-page">
      <Sidebar />
      <div className="transactions-main">
        <div className="transactions-content">
          <header className="transactions-hero">
            <div>
              <p className="transactions-eyebrow">Transactions</p>
              <h1 className="transactions-title">History & Insights</h1>
              <p className="transactions-subtitle">
                Review every payment with a clear, elegant view across accounts.
              </p>
            </div>
            <div className="transactions-hero-card">
              <span className="hero-chip hero-chip--trend">+12%</span>
              <div className="hero-card-meta">
                <p className="hero-card-label">Total this month</p>
                <p className="hero-card-value">₹ 1,48,220</p>
              </div>
              <div className="hero-card-row">
                <span className="hero-chip hero-chip--neutral">Updated 2 hrs ago</span>
              </div>
            </div>
          </header>

          <section className="transactions-summary">
            <div className="summary-card summary-card--outgoing">
              <div>
                <p className="summary-label">Outgoing</p>
                <p className="summary-value">₹ 84,560</p>
                <p className="summary-subtitle">Across 42 transactions</p>
              </div>
              <span className="summary-icon">↗</span>
            </div>
            <div className="summary-card summary-card--incoming">
              <div>
                <p className="summary-label">Incoming</p>
                <p className="summary-value">₹ 63,660</p>
                <p className="summary-subtitle">Salary + Rewards</p>
              </div>
              <span className="summary-icon summary-icon--success">↘</span>
            </div>
            <div className="summary-card summary-card--secure">
              <div>
                <p className="summary-label">Secure payments</p>
                <p className="summary-value">98.6%</p>
                <p className="summary-subtitle">Face ID verified</p>
              </div>
              <span className="summary-icon summary-icon--primary">✓</span>
            </div>
          </section>

          <section className="transactions-toolbar">
            <div className="transactions-tabs">
              <button
                className={`tab-button ${activeTab === 'all' ? 'is-active' : ''}`}
                type="button"
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button
                className={`tab-button ${activeTab === 'incoming' ? 'is-active' : ''}`}
                type="button"
                onClick={() => setActiveTab('incoming')}
              >
                Incoming
              </button>
              <button
                className={`tab-button ${activeTab === 'outgoing' ? 'is-active' : ''}`}
                type="button"
                onClick={() => setActiveTab('outgoing')}
              >
                Outgoing
              </button>
              <button
                className={`tab-button ${activeTab === 'failed' ? 'is-active' : ''}`}
                type="button"
                onClick={() => setActiveTab('failed')}
              >
                Failed
              </button>
            </div>
            <div className="transactions-toolbar-right">
              <div className="transactions-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by merchant or tag"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
              <button className="ghost-btn" type="button">Download</button>
              <button className="primary-btn" type="button">Filter</button>
            </div>
          </section>

          <section className="transactions-list">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-card">
                <div className={`transaction-icon ${transaction.direction} ${transaction.status === 'failed' ? 'failed' : ''}`}>
                  {transaction.status === 'failed'
                    ? '✕'
                    : transaction.direction === 'incoming'
                      ? '↘'
                      : '↗'}
                </div>
                <div className="transaction-body">
                  <div className="transaction-head">
                    <div>
                      <p className="transaction-title">{transaction.title}</p>
                      <p className="transaction-subtitle">{transaction.subtitle}</p>
                    </div>
                    <span className={`transaction-amount ${transaction.direction}`}>
                      {transaction.direction === 'incoming' ? '+' : '-'} {transaction.amount}
                    </span>
                  </div>
                  <div className="transaction-meta">
                    <span>{transaction.time}</span>
                    <span>•</span>
                    <span>{transaction.account}</span>
                    <span>•</span>
                    <span>{transaction.method}</span>
                  </div>
                </div>
                <div className="transaction-tags">
                  <span className={`status-pill status-${transaction.status}`}>
                    {transaction.status}
                  </span>
                  <span className="tag-pill">{transaction.tag}</span>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TransactionsHistoryPage;
