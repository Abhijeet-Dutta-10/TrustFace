import { useMemo, useRef, useState } from 'react';
import Sidebar from '../components/Sidebar';
import './FriendsPage.css';

const FriendsPage = () => {
  const allPeopleRef = useRef<HTMLDivElement | null>(null);
  const [isSortAsc, setIsSortAsc] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const recents = [
    { id: 'recent-1', name: 'Arjun Ravi', phone: '+91 98653 58769' },
    { id: 'recent-2', name: 'Numan Ali', phone: '+91 92219 70600' },
    { id: 'recent-3', name: 'Surya K', phone: '+91 91168 52659' },
    { id: 'recent-4', name: 'James G', phone: '+91 78140 70745' },
    { id: 'recent-5', name: 'Ganesh Kumar S', phone: '+91 98586 02215' },
    { id: 'recent-6', name: 'Ks Kumar', phone: '+91 99144 44340' },
  ];

  const upiActions = [
    {
      id: 'action-self',
      title: 'Self transfer',
      subtitle: 'Transfer money between your accounts',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="8" height="10" rx="2" />
          <rect x="13" y="9" width="8" height="10" rx="2" />
          <path d="M11 10h2" />
          <path d="M9 8l-2 2 2 2" />
          <path d="M15 16l2-2-2-2" />
        </svg>
      ),
    },
    {
      id: 'action-split',
      title: 'Split expense',
      subtitle: 'Share payment with a group',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="3" />
          <circle cx="16" cy="8" r="3" />
          <path d="M2 20v-1a5 5 0 0 1 5-5h2" />
          <path d="M22 20v-1a5 5 0 0 0-5-5h-2" />
          <path d="M12 12v7" />
          <path d="M9 16l3 3 3-3" />
        </svg>
      ),
    },
  ];

  const allPeople = [
    ...recents.map((person, index) => ({
      ...person,
      id: `upi-recent-${index + 1}`,
    })),
    { id: 'upi-1', name: 'Abhijeet S', phone: '+91 81665 89993' },
    { id: 'upi-2', name: 'Kiran Mehta', phone: '+91 98107 44512' },
    { id: 'upi-3', name: 'Nandini Rao', phone: '+91 90030 11842' },
    { id: 'upi-4', name: 'Rohit Kumar', phone: '+91 88921 50019' },
    { id: 'upi-5', name: 'Sana Abbas', phone: '+91 80864 70211' },
    { id: 'upi-6', name: 'Vinayak V', phone: '+91 98406 24790' },
    { id: 'upi-7', name: 'Meera Kapoor', phone: '+91 99850 21764' },
    { id: 'upi-8', name: 'Siddharth Jain', phone: '+91 88904 10357' },
    { id: 'upi-9', name: 'Neha Menon', phone: '+91 97311 55420' },
    { id: 'upi-10', name: 'Rahul Batra', phone: '+91 80123 44990' },
    { id: 'upi-11', name: 'Pooja Iyer', phone: '+91 93211 67082' },
    { id: 'upi-12', name: 'Irfan Shaikh', phone: '+91 90987 25114' },
  ];
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const hasSearch = Boolean(normalizedQuery);
  const filteredRecents = useMemo(() => {
    if (!normalizedQuery) {
      return recents;
    }
    return recents.filter((person) => {
      const nameMatch = person.name.toLowerCase().includes(normalizedQuery);
      const phoneMatch = person.phone.replace(/\s+/g, '').includes(normalizedQuery.replace(/\s+/g, ''));
      return nameMatch || phoneMatch;
    });
  }, [normalizedQuery, recents]);
  const sortedAllPeople = useMemo(() => {
    const filtered = normalizedQuery
      ? allPeople.filter((person) => {
          const nameMatch = person.name.toLowerCase().includes(normalizedQuery);
          const phoneMatch = person.phone.replace(/\s+/g, '').includes(normalizedQuery.replace(/\s+/g, ''));
          return nameMatch || phoneMatch;
        })
      : allPeople;
    return [...filtered].sort((a, b) =>
      isSortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  }, [allPeople, isSortAsc, normalizedQuery]);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || '')
      .join('');

  return (
    <div className="friends-page">
      <Sidebar />
      <div className="friends-main">
        <div className="friends-content">
          <header className="friends-hero">
            <div>
              {/* <p className="friends-eyebrow">Pay anyone on UPI</p> */}
              <h1 className="friends-title">Friends</h1>
              {/* <p className="friends-subtitle">Send money instantly to your contacts and recent recipients.</p> */}
            </div>
            <div className="friends-actions">
              <button className="ghost-btn" type="button">Invite</button>
              <button className="secondary-btn" type="button">Add Friend</button>
              <button className="primary-btn" type="button">New Payment</button>
            </div>
          </header>

          <div className="friends-toolbar">
            <div className="friends-search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or phone number"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
            <button className="ghost-btn" type="button">Manage contacts</button>
          </div>

          {hasSearch ? (
            <section className="friends-section">
              <div className="friends-section-header">
                <h2>People</h2>
              </div>
              {sortedAllPeople.length ? (
                <div className="friends-list">
                  {sortedAllPeople.map((person) => (
                    <div key={person.id} className="friend-item">
                      <div className="friend-avatar muted">
                        <span>{getInitials(person.name) || 'U'}</span>
                      </div>
                      <div className="friend-details">
                        <p className="friend-name">{person.name}</p>
                        <p className="friend-phone">{person.phone}</p>
                      </div>
                      <div className="friend-meta">
                        <button className="ghost-btn small" type="button">Request</button>
                        <button className="primary-btn small" type="button">Pay</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="friends-empty">
                  Can not find exact matches for your search. try using another search term.
                </p>
              )}
            </section>
          ) : (
            <>
              <section className="friends-section">
                <div className="friends-section-header">
                  <h2>Recents</h2>
                  <button
                    className="link-btn"
                    type="button"
                    onClick={() => allPeopleRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View all
                  </button>
                </div>
                <div className="friends-list">
                  {filteredRecents.map((person) => (
                    <div key={person.id} className="friend-item">
                      <div className="friend-avatar">
                        <span>{getInitials(person.name) || 'U'}</span>
                      </div>
                      <div className="friend-details">
                        <p className="friend-name">{person.name}</p>
                        <p className="friend-phone">{person.phone}</p>
                      </div>
                      <div className="friend-meta">
                        <button className="ghost-btn small" type="button">Request</button>
                        <button className="primary-btn small" type="button">Pay</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="friends-section" ref={allPeopleRef}>
                <div className="friends-section-header">
                  <h2>All people on UPI</h2>
                  <button
                    className="link-btn"
                    type="button"
                    onClick={() => setIsSortAsc((prev) => !prev)}
                  >
                    Sort
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginLeft: '6px', verticalAlign: 'middle' }}
                      aria-hidden="true"
                    >
                      <path d="M4 17l4 4 4-4" />
                      <path d="M8 5v16" />
                      <path d="M20 7l-4-4-4 4" />
                      <path d="M16 19V3" />
                    </svg>
                  </button>
                </div>
                <div className="upi-actions">
                  {upiActions.map((action) => (
                    <div key={action.id} className="upi-action-card">
                      <div className="upi-action-icon">{action.icon}</div>
                      <div>
                        <p className="upi-action-title">{action.title}</p>
                        <p className="upi-action-subtitle">{action.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="friends-list">
                  {sortedAllPeople.map((person) => (
                    <div key={person.id} className="friend-item">
                      <div className="friend-avatar muted">
                        <span>{getInitials(person.name) || 'U'}</span>
                      </div>
                      <div className="friend-details">
                        <p className="friend-name">{person.name}</p>
                        <p className="friend-phone">{person.phone}</p>
                      </div>
                      <div className="friend-meta">
                        <button className="ghost-btn small" type="button">Request</button>
                        <button className="primary-btn small" type="button">Pay</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
