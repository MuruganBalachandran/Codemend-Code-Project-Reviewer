import React, { useState } from 'react';
import './Settings.css';

const Settings: React.FC = () => {
  // State for form inputs
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    company: 'CodeMend Inc.'
  });

  // State for various settings toggles
  const [notificationSettings, setNotificationSettings] = useState({
    emailUpdates: true,
    emailPromotions: false,
    pushNotifications: true,
    projectActivity: true,
    smsAlerts: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showActivity: true,
    dataSharing: false,
    showEmail: false
  });

  const [appSettings, setAppSettings] = useState({
    theme: 'light',
    language: 'english',
    fontSize: 'medium',
    highContrast: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    passwordExpiry: '90days'
  });

  const [connectedAccounts, setConnectedAccounts] = useState({
    github: true,
    gitlab: false,
    bitbucket: false,
    google: true
  });

  // Active section state
  const [activeSection, setActiveSection] = useState('account');

  // Handle tab change
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  // Handle input changes
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  // Handle toggle changes
  const handleToggle = (
    settingGroup: 'notificationSettings' | 'privacySettings' | 'appSettings' | 'securitySettings' | 'connectedAccounts',
    settingName: string
  ) => {
    switch (settingGroup) {
      case 'notificationSettings':
        setNotificationSettings(prev => ({
          ...prev,
          [settingName]: !prev[settingName as keyof typeof prev]
        }));
        break;
      case 'privacySettings':
        setPrivacySettings(prev => ({
          ...prev,
          [settingName]: !prev[settingName as keyof typeof prev]
        }));
        break;
      case 'appSettings':
        setAppSettings(prev => ({
          ...prev,
          [settingName]: !prev[settingName as keyof typeof prev]
        }));
        break;
      case 'securitySettings':
        setSecuritySettings(prev => ({
          ...prev,
          [settingName]: !prev[settingName as keyof typeof prev]
        }));
        break;
      case 'connectedAccounts':
        setConnectedAccounts(prev => ({
          ...prev,
          [settingName]: !prev[settingName as keyof typeof prev]
        }));
        break;
    }
  };

  // Handle select changes
  const handleSelectChange = (
    settingGroup: 'privacySettings' | 'appSettings' | 'securitySettings',
    settingName: string,
    value: string
  ) => {
    switch (settingGroup) {
      case 'privacySettings':
        setPrivacySettings(prev => ({ ...prev, [settingName]: value }));
        break;
      case 'appSettings':
        setAppSettings(prev => ({ ...prev, [settingName]: value }));
        break;
      case 'securitySettings':
        setSecuritySettings(prev => ({ ...prev, [settingName]: value }));
        break;
    }
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to a database or API
    const successMessage = document.getElementById('save-success');
    if (successMessage) {
      successMessage.style.display = 'block';
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
    }
  };

  const handleLogoutAllSessions = () => {
    // Implementation would log user out from all devices
    if (window.confirm('Are you sure you want to log out from all devices?')) {
      alert('You have been logged out from all devices.');
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account settings and preferences</p>
        </div>

        {/* Tab Navigation like in Profile page */}
        <div className="settings-navigation">
          <button 
            className={`settings-tab ${activeSection === 'account' ? 'active' : ''}`}
            onClick={() => handleSectionChange('account')}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Account
          </button>
          
          <button 
            className={`settings-tab ${activeSection === 'notifications' ? 'active' : ''}`}
            onClick={() => handleSectionChange('notifications')}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            Notifications
          </button>
          
          <button 
            className={`settings-tab ${activeSection === 'privacy' ? 'active' : ''}`}
            onClick={() => handleSectionChange('privacy')}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Privacy
          </button>
          
          <button 
            className={`settings-tab ${activeSection === 'appearance' ? 'active' : ''}`}
            onClick={() => handleSectionChange('appearance')}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Appearance
          </button>
          
          <button 
            className={`settings-tab ${activeSection === 'connected' ? 'active' : ''}`}
            onClick={() => handleSectionChange('connected')}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            Connected Accounts
          </button>
          
          <button 
            className={`settings-tab ${activeSection === 'billing' ? 'active' : ''}`}
            onClick={() => handleSectionChange('billing')}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            Billing
          </button>
        </div>

        {/* Content area - similar to profile content */}
        <div className="settings-content">
          {activeSection === 'account' && (
            <div className="settings-section-content">
              <h2 className="section-title">Account Settings</h2>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={personalInfo.company}
                  onChange={(e) => setPersonalInfo({...personalInfo, company: e.target.value})}
                />
              </div>

              <div className="form-divider"></div>

              <div className="password-section">
                <h3>Password</h3>
                <button className="btn btn-outline">Change Password</button>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="settings-section-content">
              <h2 className="section-title">Notification Settings</h2>
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <span>Email Updates</span>
                    <p>Receive emails about your account activity</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.emailUpdates}
                      onChange={() => handleToggle('notificationSettings', 'emailUpdates')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <span>Promotional Emails</span>
                    <p>Receive emails about promotions and news</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.emailPromotions}
                      onChange={() => handleToggle('notificationSettings', 'emailPromotions')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <span>Push Notifications</span>
                    <p>Receive notifications on your device</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.pushNotifications}
                      onChange={() => handleToggle('notificationSettings', 'pushNotifications')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <span>Project Activity</span>
                    <p>Notifications about your project updates</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.projectActivity}
                      onChange={() => handleToggle('notificationSettings', 'projectActivity')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <span>SMS Alerts</span>
                    <p>Receive text messages for critical updates</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.smsAlerts}
                      onChange={() => handleToggle('notificationSettings', 'smsAlerts')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="settings-section-content">
              <h2 className="section-title">Privacy & Security</h2>
              <div className="form-group">
                <label htmlFor="profileVisibility">Profile Visibility</label>
                <select 
                  id="profileVisibility" 
                  value={privacySettings.profileVisibility}
                  onChange={(e) => handleSelectChange('privacySettings', 'profileVisibility', e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="contacts">Contacts Only</option>
                </select>
              </div>

              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <span>Show Activity Status</span>
                    <p>Allow others to see when you're active</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={privacySettings.showActivity}
                      onChange={() => handleToggle('privacySettings', 'showActivity')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <span>Data Sharing</span>
                    <p>Share anonymized usage data</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={privacySettings.dataSharing}
                      onChange={() => handleToggle('privacySettings', 'dataSharing')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="form-divider"></div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <span>Two-Factor Authentication</span>
                    <p>Add an extra layer of security</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={securitySettings.twoFactorAuth}
                      onChange={() => handleToggle('securitySettings', 'twoFactorAuth')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <span>Login Alerts</span>
                    <p>Get notified of new login attempts</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={securitySettings.loginAlerts}
                      onChange={() => handleToggle('securitySettings', 'loginAlerts')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="security-actions">
                  <button className="btn btn-danger" onClick={handleLogoutAllSessions}>
                    Logout from All Devices
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="settings-section-content">
              <h2 className="section-title">Appearance</h2>
              <div className="form-group">
                <label htmlFor="themeSelect">Theme</label>
                <div className="theme-selector">
                  <div 
                    className={`theme-option ${appSettings.theme === 'light' ? 'active' : ''}`}
                    onClick={() => handleSelectChange('appSettings', 'theme', 'light')}
                  >
                    <div className="theme-preview light-theme"></div>
                    <span>Light</span>
                  </div>
                  <div 
                    className={`theme-option ${appSettings.theme === 'dark' ? 'active' : ''}`}
                    onClick={() => handleSelectChange('appSettings', 'theme', 'dark')}
                  >
                    <div className="theme-preview dark-theme"></div>
                    <span>Dark</span>
                  </div>
                  <div 
                    className={`theme-option ${appSettings.theme === 'system' ? 'active' : ''}`}
                    onClick={() => handleSelectChange('appSettings', 'theme', 'system')}
                  >
                    <div className="theme-preview system-theme"></div>
                    <span>System</span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="languageSelect">Language</label>
                <select 
                  id="languageSelect" 
                  value={appSettings.language}
                  onChange={(e) => handleSelectChange('appSettings', 'language', e.target.value)}
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="chinese">Chinese</option>
                  <option value="japanese">Japanese</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="fontSizeSelect">Font Size</label>
                <select 
                  id="fontSizeSelect" 
                  value={appSettings.fontSize}
                  onChange={(e) => handleSelectChange('appSettings', 'fontSize', e.target.value)}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="x-large">Extra Large</option>
                </select>
              </div>

              <div className="toggle-item">
                <div className="toggle-info">
                  <span>High Contrast Mode</span>
                  <p>Increase contrast for better visibility</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={appSettings.highContrast}
                    onChange={() => handleToggle('appSettings', 'highContrast')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          )}

          {activeSection === 'connected' && (
            <div className="settings-section-content">
              <h2 className="section-title">Connected Accounts</h2>
              <div className="connected-accounts">
                <div className={`connected-account ${connectedAccounts.github ? 'connected' : ''}`}>
                  <div className="account-info">
                    <div className="account-icon github-icon">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </div>
                    <div>
                      <h3>GitHub</h3>
                      <p>{connectedAccounts.github ? 'Connected' : 'Disconnected'}</p>
                    </div>
                  </div>
                  <button 
                    className={`btn ${connectedAccounts.github ? 'btn-outline-danger' : 'btn-outline'}`}
                    onClick={() => handleToggle('connectedAccounts', 'github')}
                  >
                    {connectedAccounts.github ? 'Disconnect' : 'Connect'}
                  </button>
                </div>

                <div className={`connected-account ${connectedAccounts.gitlab ? 'connected' : ''}`}>
                  <div className="account-info">
                    <div className="account-icon gitlab-icon">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
                        <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3>GitLab</h3>
                      <p>{connectedAccounts.gitlab ? 'Connected' : 'Disconnected'}</p>
                    </div>
                  </div>
                  <button 
                    className={`btn ${connectedAccounts.gitlab ? 'btn-outline-danger' : 'btn-outline'}`}
                    onClick={() => handleToggle('connectedAccounts', 'gitlab')}
                  >
                    {connectedAccounts.gitlab ? 'Disconnect' : 'Connect'}
                  </button>
                </div>

                <div className={`connected-account ${connectedAccounts.bitbucket ? 'connected' : ''}`}>
                  <div className="account-info">
                    <div className="account-icon bitbucket-icon">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3>Bitbucket</h3>
                      <p>{connectedAccounts.bitbucket ? 'Connected' : 'Disconnected'}</p>
                    </div>
                  </div>
                  <button 
                    className={`btn ${connectedAccounts.bitbucket ? 'btn-outline-danger' : 'btn-outline'}`}
                    onClick={() => handleToggle('connectedAccounts', 'bitbucket')}
                  >
                    {connectedAccounts.bitbucket ? 'Disconnect' : 'Connect'}
                  </button>
                </div>

                <div className={`connected-account ${connectedAccounts.google ? 'connected' : ''}`}>
                  <div className="account-info">
                    <div className="account-icon google-icon">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </div>
                    <div>
                      <h3>Google</h3>
                      <p>{connectedAccounts.google ? 'Connected' : 'Disconnected'}</p>
                    </div>
                  </div>
                  <button 
                    className={`btn ${connectedAccounts.google ? 'btn-outline-danger' : 'btn-outline'}`}
                    onClick={() => handleToggle('connectedAccounts', 'google')}
                  >
                    {connectedAccounts.google ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'billing' && (
            <div className="settings-section-content">
              <h2 className="section-title">Billing & Subscription</h2>
              <div className="current-plan">
                <div className="plan-badge">Professional Plan</div>
                <p className="plan-price">$15.00 / month</p>
                <p className="plan-billing">Next billing date: Nov 15, 2023</p>
                <div className="plan-features">
                  <p><strong>Features:</strong></p>
                  <ul>
                    <li>Unlimited projects</li>
                    <li>Priority support</li>
                    <li>Advanced analytics</li>
                    <li>Team collaboration</li>
                  </ul>
                </div>
                <div className="plan-actions">
                  <button className="btn btn-outline">Change Plan</button>
                  <button className="btn btn-outline-danger">Cancel Subscription</button>
                </div>
              </div>

              <div className="form-divider"></div>

              <div className="payment-method">
                <h3>Payment Method</h3>
                <div className="credit-card">
                  <div className="card-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                  </div>
                  <div className="card-details">
                    <p>Visa ending in 4242</p>
                    <p className="card-expiry">Expires 11/25</p>
                  </div>
                  <button className="btn btn-sm btn-outline">Edit</button>
                </div>
                <button className="btn btn-outline btn-add-payment">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  Add Payment Method
                </button>
              </div>

              <div className="form-divider"></div>

              <div className="billing-history">
                <h3>Billing History</h3>
                <div className="billing-records">
                  <div className="billing-record">
                    <div className="record-date">Oct 15, 2023</div>
                    <div className="record-amount">$15.00</div>
                    <div className="record-status success">Paid</div>
                    <button className="btn btn-sm btn-text">Download</button>
                  </div>
                  <div className="billing-record">
                    <div className="record-date">Sep 15, 2023</div>
                    <div className="record-amount">$15.00</div>
                    <div className="record-status success">Paid</div>
                    <button className="btn btn-sm btn-text">Download</button>
                  </div>
                  <div className="billing-record">
                    <div className="record-date">Aug 15, 2023</div>
                    <div className="record-amount">$15.00</div>
                    <div className="record-status success">Paid</div>
                    <button className="btn btn-sm btn-text">Download</button>
                  </div>
                </div>
                <button className="btn btn-text view-all">View All History</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
