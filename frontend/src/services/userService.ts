import api from './api';

// Get the current user's profile
export const getCurrentUserProfile = async () => {
  try {
    const response = await api.get('/api/users/me');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    // Return minimal data structure to prevent UI errors
    return {
      _id: 'temp_id',
      userId: 'temp_user',
      name: 'Guest User',
      username: 'guest',
      email: 'guest@example.com',
      createdAt: new Date().toISOString(),
      skills: [],
      interests: [],
      achievements: []
    };
  }
};

// Get a user by ID
export const getUserById = async (userId: string) => {
  const response = await api.get(`/api/users/${userId}`);
  return response.data.data;
};

// Update a user's profile using the correct endpoint "/api/profile"
export const updateUserProfile = async (userData: any) => {
  try {
    const response = await api.put(`/api/profile`, userData);
    return response.data.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Get user's activity
export const getUserActivity = async (userId: string) => {
  try {
    const response = await api.get(`/api/users/${userId}/activity`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user activity:', error);
    return [];
  }
};

export default {
  getCurrentUserProfile,
  getUserById,
  updateUserProfile,
  getUserActivity
};
