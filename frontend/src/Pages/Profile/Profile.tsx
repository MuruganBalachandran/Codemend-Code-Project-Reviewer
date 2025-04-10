import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserProfile, updateUserProfile, updateProfileImage } from '../../services/profileService';
import { UserInfo } from '../../types/UserInfo';
import './Profile.css';

type ActivityType = 'project' | 'review' | 'comment' | 'suggestion';

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  date: string;
  projectId?: string;
  projectName?: string;
}

// Mock activity data that we'll replace with API calls later
const mockActivities: Activity[] = [
  {
    id: 'act1',
    type: 'project',
    title: 'Created a new project: E-Commerce Platform',
    date: '2023-10-18T14:30:00Z',
    projectId: 'p1',
    projectName: 'E-Commerce Platform'
  },
  {
    id: 'act2',
    type: 'review',
    title: 'Reviewed code for Shopping Cart component',
    date: '2023-10-16T09:45:00Z',
    projectId: 'p1',
    projectName: 'E-Commerce Platform'
  },
  {
    id: 'act3',
    type: 'suggestion',
    title: 'Suggested optimization for image loading',
    date: '2023-10-14T11:20:00Z',
    projectId: 'p1',
    projectName: 'E-Commerce Platform'
  },
  {
    id: 'act4',
    type: 'comment',
    title: 'Commented on Authentication implementation',
    date: '2023-10-12T16:40:00Z',
    projectId: 'p2',
    projectName: 'Task Management App'
  },
  {
    id: 'act5',
    type: 'project',
    title: 'Started a new project: Weather Dashboard',
    date: '2023-10-10T13:15:00Z',
    projectId: 'p3',
    projectName: 'Weather Dashboard'
  }
];

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [activities] = useState<Activity[]>(mockActivities);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'activity' | 'editProfile'>('overview');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoading(true);
        setError('');
        const data = await getUserProfile();

        setUserData({
          _id: data._id,
          createdAt: data.createdAt || new Date().toISOString(),
          id: data._id,
          userId: data.userId || 'USR_1001',
          fullName: data.name || 'Anonymous User',
          username: data.username || 'anonymous',
          email: data.email || '',
          profileImage: data.profileImage || 'https://randomuser.me/api/portraits/lego/5.jpg',
          bio: data.bio || '',
          location: data.location || '',
          website: data.website || '',
          github: data.github || '',
          joinDate: data.createdAt || new Date().toISOString(),
          skills: data.skills || [],
          interests: data.interests || [],
          achievements: data.achievements || [],
          stats: data.stats || {
            projects: 0,
            codeReviews: 0,
            suggestions: 0,
            reputation: 0
          },
          privacy: data.privacy || {
            email: false,
            location: true,
            activity: true
          },
          name: ''
        });
      } catch (err: any) {
        console.error('Error fetching user data:', err);
        setError('Failed to load profile data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    if (seconds > intervals.year) {
      const years = Math.floor(seconds / intervals.year);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
    if (seconds > intervals.month) {
      const months = Math.floor(seconds / intervals.month);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
    if (seconds > intervals.week) {
      const weeks = Math.floor(seconds / intervals.week);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
    if (seconds > intervals.day) {
      const days = Math.floor(seconds / intervals.day);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
    if (seconds > intervals.hour) {
      const hours = Math.floor(seconds / intervals.hour);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    if (seconds > intervals.minute) {
      const minutes = Math.floor(seconds / intervals.minute);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }

    return 'Just now';
  };

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userData || !e.target.files || !e.target.files[0]) return;

    try {
      setIsLoading(true);
      const file = e.target.files[0];

      const imageUrl = await updateProfileImage(file);

      setUserData({
        ...userData,
        profileImage: imageUrl
      });

      setSuccessMessage('Profile picture updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      console.error('Error updating profile image:', err);
      setError('Failed to update profile picture. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrivacyToggle = (key: keyof UserInfo['privacy']) => {
    if (!userData) return;

    setUserData({
      ...userData,
      privacy: {
        ...userData.privacy,
        [key]: !userData.privacy[key]
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!userData) return;

    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleAddSkill = () => {
    if (!userData || !skillInput.trim()) return;

    setUserData({
      ...userData,
      skills: [...userData.skills, skillInput.trim()]
    });
    setSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (!userData) return;

    setUserData({
      ...userData,
      skills: userData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleAddInterest = () => {
    if (!userData || !interestInput.trim()) return;

    setUserData({
      ...userData,
      interests: [...userData.interests, interestInput.trim()]
    });
    setInterestInput('');
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    if (!userData) return;

    setUserData({
      ...userData,
      interests: userData.interests.filter(interest => interest !== interestToRemove)
    });
  };

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'project':
        return (
          <div className="activity-icon project-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
        );
      case 'review':
        return (
          <div className="activity-icon review-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
        );
      case 'comment':
        return (
          <div className="activity-icon comment-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
        );
      case 'suggestion':
        return (
          <div className="activity-icon suggestion-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
              <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
              <line x1="3" y1="22" x2="21" y2="22"></line>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const handleUpdateProfile = async () => {
    if (!userData) return;

    try {
      setIsLoading(true);
      setError('');

      const updateData = {
        name: userData.fullName,
        username: userData.username,
        email: userData.email,
        bio: userData.bio,
        location: userData.location,
        website: userData.website,
        github: userData.github,
        skills: userData.skills,
        interests: userData.interests,
        privacy: userData.privacy
      };

      const updatedUser = await updateUserProfile(updateData);

      setUserData({
        ...userData,
        ...updatedUser
      });

      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setActiveTab('overview');
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.error || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state
  if (isLoading && !userData) {
    return (
      <div className="profile-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading profile data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !userData) {
    return (
      <div className="profile-page">
        <div className="error-container">
          <h2>Error Loading Profile</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="reload-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If no user data, show a message
  if (!userData) {
    return (
      <div className="profile-page">
        <div className="error-container">
          <h2>Profile Not Found</h2>
          <p>Could not find the requested profile information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Show loading overlay when updating */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Updating profile...</p>
        </div>
      )}

      {/* Success notification */}
      {successMessage && (
        <div className="success-notification">
          <p>{successMessage}</p>
          <button onClick={() => setSuccessMessage('')}>Dismiss</button>
        </div>
      )}

      {/* Error notification */}
      {error && (
        <div className="error-notification">
          <p>{error}</p>
          <button onClick={() => setError('')}>Dismiss</button>
        </div>
      )}

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-cover"></div>
          <div className="profile-info">
            <div className="profile-avatar-container">
              <div className="profile-avatar" onClick={handleProfileImageClick}>
                <img src={userData.profileImage} alt={userData.fullName} />
                <div className="avatar-overlay">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleProfileImageChange}
                style={{ display: 'none' }}
                accept="image/*"
              />
            </div>
            <div className="profile-details">
              <div>
                <h1 className="profile-name">{userData.fullName}</h1>
                <p className="profile-username">@{userData.username}</p>
              </div>
              <div className="profile-actions">
                <button 
                  className="edit-profile-btn"
                  onClick={() => setActiveTab('editProfile')}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="profile-meta">
              <div className="meta-item">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span>{userData.stats.projects} Projects</span>
              </div>
              <div className="meta-item">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span>{userData.stats.codeReviews} Reviews</span>
              </div>
              <div className="meta-item">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>{userData.stats.reputation} Reputation</span>
              </div>
              <div className="meta-item">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Joined {formatDate(userData.joinDate)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-navigation">
          <button
            className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Overview
          </button>
          <button
            className={`nav-tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            Projects
          </button>
          <button
            className={`nav-tab ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            Activity
          </button>
          <button
            className={`nav-tab ${activeTab === 'editProfile' ? 'active' : ''}`}
            onClick={() => setActiveTab('editProfile')}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit Profile
          </button>
        </div>

        <div className="profile-content">
          {activeTab === 'overview' && (
            <div className="profile-overview">
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
          )}

          {activeTab === 'projects' && (
            <div className="profile-projects">
              <h2 className="section-title">Your Projects</h2>
              <p>Project list will be displayed here...</p>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="profile-activity-tab">
              <h2 className="section-title">Activity Log</h2>
              <div className="activity-filters">
                <button className="filter-button active">All</button>
                <button className="filter-button">Projects</button>
                <button className="filter-button">Reviews</button>
                <button className="filter-button">Comments</button>
                <button className="filter-button">Suggestions</button>
              </div>

              <div className="activity-list full">
                {activities.map(activity => (
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
            </div>
          )}

          {activeTab === 'editProfile' && (
            <div className="profile-settings">
              <div className="settings-section">
                <h2 className="section-title">Profile Settings</h2>

                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={userData.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    className="bio-editor"
                    value={userData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell others about yourself..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={userData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="website">Website</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={userData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="github">GitHub Username</label>
                  <input
                    type="text"
                    id="github"
                    name="github"
                    value={userData.github}
                    onChange={handleInputChange}
                    placeholder="yourusername"
                  />
                </div>

                <div className="form-group">
                  <label>Skills</label>
                  <div className="input-with-button">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="Add a skill (e.g., JavaScript)"
                    />
                    <button 
                      onClick={handleAddSkill}
                      className="add-button"
                      type="button"
                      disabled={!skillInput.trim()}
                    >
                      Add
                    </button>
                  </div>
                  <div className="skills-list edit-mode">
                    {userData.skills.map((skill, index) => (
                      <div key={index} className="tag-with-remove">
                        <span className="skill-tag">{skill}</span>
                        <button 
                          onClick={() => handleRemoveSkill(skill)}
                          className="remove-button"
                          type="button"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {userData.skills.length === 0 && (
                      <p className="no-items-message">No skills added yet. Add some to showcase your expertise.</p>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>Interests</label>
                  <div className="input-with-button">
                    <input
                      type="text"
                      value={interestInput}
                      onChange={(e) => setInterestInput(e.target.value)}
                      placeholder="Add an interest (e.g., Machine Learning)"
                    />
                    <button 
                      onClick={handleAddInterest}
                      className="add-button"
                      type="button"
                      disabled={!interestInput.trim()}
                    >
                      Add
                    </button>
                  </div>
                  <div className="interests-list edit-mode">
                    {userData.interests.map((interest, index) => (
                      <div key={index} className="tag-with-remove">
                        <span className="interest-tag">{interest}</span>
                        <button 
                          onClick={() => handleRemoveInterest(interest)}
                          className="remove-button"
                          type="button"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {userData.interests.length === 0 && (
                      <p className="no-items-message">No interests added yet. Add some to show what you're passionate about.</p>
                    )}
                  </div>
                </div>

                <div className="privacy-settings">
                  <h3>Privacy Settings</h3>
                  <div className="privacy-option">
                    <div className="privacy-info">
                      <h4>Show Email</h4>
                      <p>Make your email visible to other users</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={userData.privacy.email}
                        onChange={() => handlePrivacyToggle('email')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="privacy-option">
                    <div className="privacy-info">
                      <h4>Show Location</h4>
                      <p>Make your location visible to other users</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={userData.privacy.location}
                        onChange={() => handlePrivacyToggle('location')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="privacy-option">
                    <div className="privacy-info">
                      <h4>Show Activity</h4>
                      <p>Let others see your activity on the platform</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={userData.privacy.activity}
                        onChange={() => handlePrivacyToggle('activity')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleUpdateProfile}
                  className="save-settings-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
