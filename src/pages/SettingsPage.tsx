import { useEffect, useRef, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getAuthSession } from '../utils/authSession';
import './SettingsPage.css';

const SettingsPage = () => {
  const session = getAuthSession();
  const profileName = session.name || 'Abhijeet Dutta';
  const profileEmail = session.email || 'abhijeet@trustface.com';
  const profilePhone = session.phone || '+91 98765 43210';
  const profileInitials = profileName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() || '')
    .slice(0, 2)
    .join('');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const bannerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collapseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [cardNickname, setCardNickname] = useState('');
  const [cardLast4, setCardLast4] = useState('');
  const [cardNicknameError, setCardNicknameError] = useState('');
  const [cardLast4Error, setCardLast4Error] = useState('');
  const [hasTriedAddCard, setHasTriedAddCard] = useState(false);
  const [cards, setCards] = useState<Array<{ id: string; nickname: string; last4: string }>>([
    { id: 'card-1', nickname: 'HDFC Bank', last4: '2456' },
    { id: 'card-2', nickname: 'SBI Bank', last4: '9804' },
    
  ]);
  const [sessionTimeout, setSessionTimeout] = useState(15);
  const [isEditingTimeout, setIsEditingTimeout] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<{ current?: string; new?: string; confirm?: string }>({});

  const toggleCard = (cardId: string) => {
    setExpandedCard((current) => (current === cardId ? null : cardId));
    if (cardId !== 'profile') {
      setHasTriedAddCard(false);
      setCardNicknameError('');
      setCardLast4Error('');
    }
  };

  const showBanner = (message: string) => {
    setBannerMessage(message);
    if (bannerTimeoutRef.current) {
      clearTimeout(bannerTimeoutRef.current);
    }
    bannerTimeoutRef.current = setTimeout(() => {
      setBannerMessage(null);
    }, 2000);
  };

  const handleUpdate = (cardTitle: string) => {
    showBanner(`${cardTitle} updated`);
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
    }
    collapseTimeoutRef.current = setTimeout(() => {
      setExpandedCard(null);
    }, 1200);
  };

  const handleReset = (cardTitle: string) => {
    showBanner(`${cardTitle} reset`);
  };

  const handleEditTimeout = () => {
    setIsEditingTimeout(true);
  };

  const handleSaveTimeout = () => {
    if (sessionTimeout < 5 || sessionTimeout > 120) {
      return;
    }
    setIsEditingTimeout(false);
    showBanner('Session timeout updated');
  };

  const handleCancelTimeout = () => {
    setIsEditingTimeout(false);
  };

  const handleChangePassword = () => {
    setShowPasswordModal(true);
    setPasswordErrors({});
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordErrors({});
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSavePassword = () => {
    const errors: { current?: string; new?: string; confirm?: string } = {};
    
    if (!currentPassword) {
      errors.current = 'Enter current password';
    }
    
    if (!newPassword) {
      errors.new = 'Enter new password';
    } else if (newPassword.length < 8) {
      errors.new = 'Password must be at least 8 characters';
    }
    
    if (!confirmPassword) {
      errors.confirm = 'Confirm your new password';
    } else if (newPassword !== confirmPassword) {
      errors.confirm = 'Passwords do not match';
    }
    
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }
    
    setShowPasswordModal(false);
    setPasswordErrors({});
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showBanner('Password changed successfully');
  };

  const handleAddCard = () => {
    const nickname = cardNickname.trim();
    const last4 = cardLast4.trim();
    setHasTriedAddCard(true);
    setCardNicknameError('');
    setCardLast4Error('');
    let hasError = false;
    if (!nickname) {
      setCardNicknameError('Enter a card name');
      hasError = true;
    }
    if (!/^\d{4}$/.test(last4)) {
      setCardLast4Error('Enter exactly 4 digits');
      hasError = true;
    }
    if (hasError) {
      return;
    }
    setCards((prev) => [
      ...prev,
      { id: `card-${Date.now()}`, nickname, last4 },
    ]);
    setCardNickname('');
    setCardLast4('');
    setCardNicknameError('');
    setCardLast4Error('');
    setHasTriedAddCard(false);
  };

  useEffect(() => {
    return () => {
      if (bannerTimeoutRef.current) {
        clearTimeout(bannerTimeoutRef.current);
      }
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="settings-page">
      <Sidebar />
      <div className="settings-main">
        <div className="settings-content">
          <header className="settings-hero">
            <div>
              <p className="settings-eyebrow">Settings</p>
              <h1 className="settings-title">Account & Security</h1>
              <p className="settings-subtitle">
                Manage profile, security, and preferences while keeping TrustFace protected.
              </p>
            </div>
          </header>

          {bannerMessage && (
            <div className="settings-banner">{bannerMessage}</div>
          )}

          <section className="settings-grid">
            <div className={`settings-card ${expandedCard === 'profile' ? 'is-expanded' : 'is-collapsed'}`}>
              <button
                className="settings-card-toggle"
                type="button"
                onClick={() => toggleCard('profile')}
              >
                <div className="settings-card-head">
                  <div>
                    <h2>Profile Details</h2>
                    <p className="settings-caption">Identity, role, and contact info</p>
                  </div>
                  {/* <span className="settings-status">Profile</span> */}
                </div>
                <span className="card-chevron" aria-hidden="true">▾</span>
              </button>
              {expandedCard === 'profile' && (
                <div className="settings-card-body">
                  <div className="profile-block">
                  <div className="profile-avatar">{profileInitials || 'AD'}</div>
                    <div>
                      <p className="profile-name">{profileName}</p>
                      {/* <p className="profile-role">Administrator</p> */}
                    </div>
                    <button className="outline-btn" type="button">Update Photo</button>
                  </div>
                  <div className="settings-fields">
                    <label className="settings-field">
                      Full Name
                      <input type="text" defaultValue={profileName} />
                    </label>
                    <label className="settings-field">
                      Work Email
                      <input type="email" defaultValue={profileEmail} />
                    </label>
                    <label className="settings-field">
                      Phone
                      <input type="tel" defaultValue={profilePhone} />
                    </label>
                  </div>
                  <div className="cards-section">
                    <div className="cards-header">
                      <div>
                        <p className="cards-title">Saved Cards</p>
                        <p className="cards-subtitle">Add and manage your payment cards</p>
                      </div>
                    </div>
                    <div className="cards-list">
                      {cards.map((card, index) => (
                        <div key={card.id} className={`card-item ${index % 2 === 0 ? 'card-gradient-1' : 'card-gradient-2'}`}>
                          <div>
                            <div className="card-chip" />
                            <span className="card-brand">VISA</span>
                          </div>
                          <div>
                            <p className="card-name">{card.nickname}</p>
                            <p className="card-number">XXXX XXXX {card.last4}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="card-form">
                      <label className="settings-field">
                        Card Name
                        <input
                          type="text"
                          placeholder="e.g., Payroll Card"
                          value={cardNickname}
                          onChange={(event) => {
                            setCardNickname(event.target.value);
                            if (cardNicknameError) {
                              setCardNicknameError('');
                            }
                          }}
                        />
                        {hasTriedAddCard && cardNicknameError && (
                          <span className="field-error">{cardNicknameError}</span>
                        )}
                      </label>
                      <label className="settings-field">
                        Last 4 Digits
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={4}
                          placeholder="1234"
                          value={cardLast4}
                          onChange={(event) => {
                            setCardLast4(event.target.value.replace(/\D/g, ''));
                            if (cardLast4Error) {
                              setCardLast4Error('');
                            }
                          }}
                        />
                        {hasTriedAddCard && cardLast4Error && (
                          <span className="field-error">{cardLast4Error}</span>
                        )}
                      </label>
                      <button className="primary-btn" type="button" onClick={handleAddCard}>
                        Add Card
                      </button>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button className="ghost-btn" type="button" onClick={() => handleReset('Profile details')}>
                      Reset
                    </button>
                    <button className="primary-btn" type="button" onClick={() => handleUpdate('Profile details')}>
                      Update
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className={`settings-card ${expandedCard === 'security' ? 'is-expanded' : 'is-collapsed'}`}>
              <button
                className="settings-card-toggle"
                type="button"
                onClick={() => toggleCard('security')}
              >
                <div className="settings-card-head">
                  <div>
                    <h2>Security & Access</h2>
                    <p className="settings-caption">Authentication and session controls</p>
                  </div>
                  {/* <span className="settings-status">Protection</span> */}
                </div>
                <span className="card-chevron" aria-hidden="true">▾</span>
              </button>
              {expandedCard === 'security' && (
                <div className="settings-card-body">
                  <div className="settings-list">
                    <div className="settings-item">
                      <div>
                        <p className="item-title">Two-factor authentication</p>
                        <p className="item-subtitle">Require OTP for sensitive operations.</p>
                      </div>
                      <label className="toggle">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider" />
                      </label>
                    </div>
                    <div className="settings-item">
                      <div>
                        <p className="item-title">Biometric verification</p>
                        <p className="item-subtitle">Enforce face match before payments.</p>
                      </div>
                      <label className="toggle">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider" />
                      </label>
                    </div>
                    <div className="settings-item">
                      <div>
                        <p className="item-title">Session timeout</p>
                        {isEditingTimeout ? (
                          <div className="timeout-editor">
                            <input
                              type="number"
                              min="5"
                              max="120"
                              value={sessionTimeout}
                              onChange={(e) => setSessionTimeout(Number(e.target.value))}
                              className="timeout-input"
                            />
                            <span className="timeout-unit">minutes</span>
                            <div className="timeout-actions">
                              <button className="ghost-btn-small" type="button" onClick={handleCancelTimeout}>
                                Cancel
                              </button>
                              <button className="primary-btn-small" type="button" onClick={handleSaveTimeout}>
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="item-subtitle">Auto-log out after {sessionTimeout} minutes of inactivity.</p>
                        )}
                      </div>
                      {!isEditingTimeout && (
                        <button className="outline-btn" type="button" onClick={handleEditTimeout}>
                          Edit
                        </button>
                      )}
                    </div>
                    <div className="settings-item">
                      <div>
                        <p className="item-title">Password</p>
                        <p className="item-subtitle">Last updated 14 days ago.</p>
                      </div>
                      <button className="outline-btn" type="button" onClick={handleChangePassword}>
                        Change
                      </button>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button className="ghost-btn" type="button" onClick={() => handleReset('Security settings')}>
                      Reset
                    </button>
                    <button className="primary-btn" type="button" onClick={() => handleUpdate('Security settings')}>
                      Update
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className={`settings-card ${expandedCard === 'notifications' ? 'is-expanded' : 'is-collapsed'}`}>
              <button
                className="settings-card-toggle"
                type="button"
                onClick={() => toggleCard('notifications')}
              >
                <div className="settings-card-head">
                  <div>
                    <h2>Notifications</h2>
                    <p className="settings-caption">Alerts and activity updates</p>
                  </div>
                  {/* <span className="settings-status">Alerts</span> */}
                </div>
                <span className="card-chevron" aria-hidden="true">▾</span>
              </button>
              {expandedCard === 'notifications' && (
                <div className="settings-card-body">
                  <div className="settings-list">
                    <div className="settings-item">
                      <div>
                        <p className="item-title">Verification alerts</p>
                        <p className="item-subtitle">Get notified on high-risk verifications.</p>
                      </div>
                      <label className="toggle">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider" />
                      </label>
                    </div>
                    <div className="settings-item">
                      <div>
                        <p className="item-title">Transaction updates</p>
                        <p className="item-subtitle">Receive confirmations for each payment.</p>
                      </div>
                      <label className="toggle">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider" />
                      </label>
                    </div>
                    <div className="settings-item">
                      <div>
                        <p className="item-title">Weekly summary</p>
                        <p className="item-subtitle">Monday insights on account activity.</p>
                      </div>
                      <label className="toggle">
                        <input type="checkbox" />
                        <span className="toggle-slider" />
                      </label>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button className="ghost-btn" type="button" onClick={() => handleReset('Notifications')}>
                      Reset
                    </button>
                    <button className="primary-btn" type="button" onClick={() => handleUpdate('Notifications')}>
                      Update
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className={`settings-card ${expandedCard === 'preferences' ? 'is-expanded' : 'is-collapsed'}`}>
              <button
                className="settings-card-toggle"
                type="button"
                onClick={() => toggleCard('preferences')}
              >
                <div className="settings-card-head">
                  <div>
                    <h2>Preferences</h2>
                    <p className="settings-caption">Language, timezone, and theme</p>
                  </div>
                  {/* <span className="settings-status">Personal</span> */}
                </div>
                <span className="card-chevron" aria-hidden="true">▾</span>
              </button>
              {expandedCard === 'preferences' && (
                <div className="settings-card-body">
                  <div className="settings-fields">
                    <label className="settings-field">
                      Default Language
                      <select defaultValue="English (India)">
                        <option>English (India)</option>
                        <option>English (US)</option>
                        <option>Hindi</option>
                        <option>Spanish</option>
                      </select>
                    </label>
                    <label className="settings-field">
                      Timezone
                      <select defaultValue="Asia/Kolkata">
                        <option>Asia/Kolkata</option>
                        <option>Asia/Dubai</option>
                        <option>Europe/London</option>
                        <option>America/New_York</option>
                      </select>
                    </label>
                    <label className="settings-field">
                      Data Retention
                      <select defaultValue="90 days">
                        <option>30 days</option>
                        <option>60 days</option>
                        <option>90 days</option>
                        <option>180 days</option>
                      </select>
                    </label>
                    <label className="settings-field">
                      Theme
                      <select defaultValue="TrustFace Light">
                        <option>TrustFace Light</option>
                        <option>TrustFace Dark</option>
                        <option>System</option>
                      </select>
                    </label>
                  </div>
                  <div className="card-actions">
                    <button className="ghost-btn" type="button" onClick={() => handleReset('Preferences')}>
                      Reset
                    </button>
                    <button className="primary-btn" type="button" onClick={() => handleUpdate('Preferences')}>
                      Update
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {showPasswordModal && (
        <div className="modal-overlay" onClick={handleClosePasswordModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Change Password</h3>
              <button className="modal-close" type="button" onClick={handleClosePasswordModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <label className="settings-field">
                Current Password
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    if (passwordErrors.current) {
                      setPasswordErrors({ ...passwordErrors, current: '' });
                    }
                  }}
                />
                {passwordErrors.current && (
                  <span className="field-error">{passwordErrors.current}</span>
                )}
              </label>
              <label className="settings-field">
                New Password
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (passwordErrors.new) {
                      setPasswordErrors({ ...passwordErrors, new: '' });
                    }
                  }}
                />
                {passwordErrors.new && (
                  <span className="field-error">{passwordErrors.new}</span>
                )}
              </label>
              <label className="settings-field">
                Confirm New Password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (passwordErrors.confirm) {
                      setPasswordErrors({ ...passwordErrors, confirm: '' });
                    }
                  }}
                />
                {passwordErrors.confirm && (
                  <span className="field-error">{passwordErrors.confirm}</span>
                )}
              </label>
            </div>
            <div className="modal-footer">
              <button className="ghost-btn" type="button" onClick={handleClosePasswordModal}>
                Cancel
              </button>
              <button className="primary-btn" type="button" onClick={handleSavePassword}>
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
