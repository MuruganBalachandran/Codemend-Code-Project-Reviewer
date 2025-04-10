import React, { useEffect, useState } from 'react';
import api from '../../services/api';

interface Notification {
  _id: string;
  category: string;
  message: string;
  relatedProject?: string;
  isRead: boolean;
  timestamp: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Define categories for filtering
  const categories = [
    { type: 'all', label: 'All' },
    { type: 'review', label: 'Review' },
    { type: 'comment', label: 'Comment' },
    { type: 'suggestion', label: 'Suggestion' },
    { type: 'project', label: 'Project' }
  ];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get('/api/notifications');
        setNotifications(res.data.data);
      } catch (err: any) {
        console.error('Failed to fetch notifications:', err);
        setError('Failed to load notifications.');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  // Filter notifications based on selected category
  const filteredNotifications = activeCategory === 'all'
    ? notifications
    : notifications.filter(n => n.category.toLowerCase() === activeCategory);

  if (loading) return <div>Loading notifications…</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {/* Category Filter Bar */}
      <div className="category-filter">
        {categories.map(cat => (
          <button
            key={cat.type}
            className={`category-button ${activeCategory === cat.type ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.type)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filteredNotifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="notifications-list">
          {filteredNotifications.map(notif => (
            <li key={notif._id} className={`notification-item ${notif.isRead ? 'read' : 'unread'}`}>
              <div className="notification-message">{notif.message}</div>
              <div className="notification-timestamp">
                {new Date(notif.timestamp).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
