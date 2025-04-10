import React, { JSX, useState } from 'react';
import { Activity as ActivityType } from '../../types/Activity';

interface ActivityProps {
  activities: ActivityType[];
  getTimeSince: (dateString: string) => string;
  getActivityIcon: (type: 'project' | 'review' | 'comment' | 'suggestion') => JSX.Element | null;
}

const Activity: React.FC<ActivityProps> = ({ activities, getTimeSince, getActivityIcon }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'project' | 'review' | 'comment' | 'suggestion'>('all');

  const filteredActivities = activeFilter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === activeFilter);

  return (
    <div className="profile-activity-tab">
      <h2 className="section-title">Activity Log</h2>
      <div className="activity-filters">
        <button 
          className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-button ${activeFilter === 'project' ? 'active' : ''}`}
          onClick={() => setActiveFilter('project')}
        >
          Projects
        </button>
        <button 
          className={`filter-button ${activeFilter === 'review' ? 'active' : ''}`}
          onClick={() => setActiveFilter('review')}
        >
          Reviews
        </button>
        <button 
          className={`filter-button ${activeFilter === 'comment' ? 'active' : ''}`}
          onClick={() => setActiveFilter('comment')}
        >
          Comments
        </button>
        <button 
          className={`filter-button ${activeFilter === 'suggestion' ? 'active' : ''}`}
          onClick={() => setActiveFilter('suggestion')}
        >
          Suggestions
        </button>
      </div>

      <div className="activity-list full">
        {filteredActivities.length > 0 ? (
          filteredActivities.map(activity => (
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
          ))
        ) : (
          <p className="no-activity">No activities found for this filter.</p>
        )}
      </div>
    </div>
  );
};

export default Activity;