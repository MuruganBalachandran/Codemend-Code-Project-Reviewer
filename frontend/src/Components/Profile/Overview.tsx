import React, { JSX } from 'react';
import { UserInfo } from '../../types/UserInfo';
import { Activity } from '../../types/Activity';

interface OverviewProps {
  userData: UserInfo;
  activities: Activity[];
  setActiveTab: (tab: 'overview' | 'projects' | 'activity' | 'editProfile') => void;
  formatDate: (dateString: string) => string;
  getTimeSince: (dateString: string) => string;
  getActivityIcon: (type: 'project' | 'review' | 'comment' | 'suggestion') => JSX.Element | null;
}

const Overview: React.FC<OverviewProps> = ({ 
  userData, 
  activities, 
  setActiveTab, 
  formatDate, 
  getTimeSince, 
  getActivityIcon 
}) => {
  return (
    <div className="profile-overview">
      {/* Basic Info */}
      <h1>{userData.name}</h1>
      <p>User ID: {userData.userId}</p>
      <p>@{userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Joined: {new Date(userData.createdAt).toLocaleDateString()}</p>
      
      {/* Extended Info */}
      {userData.bio && <p>Bio: {userData.bio}</p>}
      {userData.location && userData.privacy.location && <p>Location: {userData.location}</p>}
      {userData.website && (
        <p>
          Website:{' '}
          <a href={userData.website} target="_blank" rel="noopener noreferrer">
            {userData.website.replace(/^https?:\/\//, '')}
          </a>
        </p>
      )}
      {userData.github && (
        <p>
          GitHub:{' '}
          <a href={`https://github.com/${userData.github}`} target="_blank" rel="noopener noreferrer">
            {userData.github}
          </a>
        </p>
      )}

      <div className="profile-section bio-section">
        <h2 className="section-title">About</h2>
        <p className="profile-bio">{userData.bio}</p>

        <div className="contact-info">
          {userData.location && userData.privacy.location && (
            <div className="contact-item">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{userData.location}</span>
            </div>
          )}

          {userData.email && userData.privacy.email && (
            <div className="contact-item">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>{userData.email}</span>
            </div>
          )}

          {userData.website && (
            <div className="contact-item">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <a href={userData.website} target="_blank" rel="noopener noreferrer">
                {userData.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}

          {userData.github && (
            <div className="contact-item">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <a href={`https://github.com/${userData.github}`} target="_blank" rel="noopener noreferrer">
                {userData.github}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="profile-columns">
        <div className="profile-section skills-section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-list">
            {userData.skills && userData.skills.length > 0 ? (
              userData.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))
            ) : (
              <p>No skills added yet</p>
            )}
          </div>

          <h2 className="section-title">Interests</h2>
          <div className="interests-list">
            {userData.interests && userData.interests.length > 0 ? (
              userData.interests.map((interest, index) => (
                <span key={index} className="interest-tag">{interest}</span>
              ))
            ) : (
              <p>No interests added yet</p>
            )}
          </div>
        </div>

        <div className="profile-section achievements-section">
          <h2 className="section-title">Achievements</h2>
          <div className="achievements-list">
            {userData.achievements && userData.achievements.length > 0 ? (
              userData.achievements.map(achievement => (
                <div key={achievement.id} className="achievement-item">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-info">
                    <h3 className="achievement-title">{achievement.title}</h3>
                    <p className="achievement-date">{formatDate(achievement.date)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No achievements yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="profile-section activity-section">
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-list">
          {activities.slice(0, 3).map(activity => (
            <div key={activity.id} className="activity-item">
              {getActivityIcon(activity.type)}
              <div className="activity-content">
                <p className="activity-title">{activity.title}</p>
                <div className="activity-meta">
                  <span className="activity-date">{getTimeSince(activity.date)}</span>
                  {activity.projectName && (
                    <span className="activity-project">in {activity.projectName}</span>  
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button 
          className="view-all-button"
          onClick={() => setActiveTab('activity')}
        >
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default Overview;