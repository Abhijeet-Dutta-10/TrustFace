import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  isCollapsed?: boolean;
}

interface MenuItem {
  name: string;
  icon: ReactElement;
  badge: number | null;
}

const Sidebar = ({ isCollapsed: initialCollapsed = false }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const pathToItemMap: Record<string, string> = {
    '/home': 'Dashboard',
    '/services': 'Services',
    '/services/bank-transfer': 'Services',
    '/services/bank-transfer/amount': 'Services',
    '/notifications': 'Notifications',
    '/settings': 'Settings',
  };
  const routeMap: Record<string, string> = {
    Dashboard: '/home',
    Services: '/services',
    Notifications: '/notifications',
    Settings: '/settings',
  };
  const [activeItem, setActiveItem] = useState(
    pathToItemMap[location.pathname] ?? 'Dashboard'
  );
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    setActiveItem(pathToItemMap[location.pathname] ?? 'Dashboard');
  }, [location.pathname]);

  const menuItems: MenuItem[] = [
    { 
      name: 'Dashboard', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      ), 
      badge: null 
    },
    { 
      name: 'Transactions History', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ), 
      badge: null 
    },
    { 
      name: 'Friends', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          <line x1="12" y1="11" x2="12" y2="11"/>
        </svg>
      ), 
      badge: null 
    },
    { 
      name: 'Services', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="9" y1="21" x2="9" y2="9"/>
        </svg>
      ), 
      badge: null 
    },
    { 
      name: 'Rewards', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="8" width="18" height="13" rx="2"/>
          <line x1="12" y1="8" x2="12" y2="21"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <path d="M7.5 8a2.5 2.5 0 1 1 0-5c2 0 4.5 5 4.5 5s2.5-5 4.5-5a2.5 2.5 0 1 1 0 5"/>
        </svg>
      ), 
      badge: null 
    },
    { 
      name: 'Notifications', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      ), 
      badge: 2 
    },
    { 
      name: 'Profile', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ), 
      badge: null 
    },
    { 
      name: 'Settings', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z"/>
        </svg>
      ), 
      badge: null 
    },
  ];

  const bottomItems: MenuItem[] = [
    { 
      name: 'Help', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ), 
      badge: null 
    },
    { 
      name: 'Support', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ), 
      badge: 3 
    },
  ];

  // Filter menu items based on search query
  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="8" r="3" stroke="white" strokeWidth="2" fill="none"/>
              <path
                d="M6 21C6 17 9 14 12 14C15 14 18 17 18 21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M2 12L4 10L6 12L10 8L12 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <circle cx="20" cy="4" r="2" fill="white"/>
            </svg>
          </div>
          {!isCollapsed && <span className="logo-text">TrustFace</span>}
        </div>
        {!isCollapsed && (
          <button 
            className="collapse-btn" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            title="Collapse"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
        )}
      </div>

      {isCollapsed && (
        <button 
          className="collapsed-toggle-btn" 
          onClick={() => setIsCollapsed(false)}
          title="Expand"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      )}

      {isCollapsed ? (
        <button 
          className="collapsed-search-btn" 
          onClick={() => setIsCollapsed(false)}
          title="Search"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      ) : (
        <div className="sidebar-search">
          <div className="search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <div className="sidebar-menu">
        <div className="menu-items">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item) => (
              <button
                key={item.name}
                className={`menu-item ${activeItem === item.name ? 'active' : ''}`}
                onClick={() => {
                  setActiveItem(item.name);
                  const targetRoute = routeMap[item.name];
                  if (targetRoute) {
                    navigate(targetRoute);
                  }
                }}
                title={isCollapsed ? item.name : ''}
              >
                <div className="menu-icon">{item.icon}</div>
                {!isCollapsed && (
                  <>
                    <span className="menu-text">{item.name}</span>
                    {item.badge && (
                      <span className="menu-badge">{item.badge}</span>
                    )}
                  </>
                )}
              </button>
            ))
          ) : (
            !isCollapsed && (
              <div className="no-results">No items found</div>
            )
          )}
        </div>
      </div>

      <div className="sidebar-bottom">
        {bottomItems.map((item) => (
          <button
            key={item.name}
            className="menu-item"
            onClick={() => setActiveItem(item.name)}
            title={isCollapsed ? item.name : ''}
          >
            <div className="menu-icon">{item.icon}</div>
            {!isCollapsed && (
              <>
                <span className="menu-text">{item.name}</span>
                {item.badge && (
                  <span className="menu-badge">{item.badge}</span>
                )}
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
