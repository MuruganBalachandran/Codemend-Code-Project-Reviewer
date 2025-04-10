import api from './api';
import { UserInfo, UserActivity } from '../types/UserInfo';

// Get the current user's profile
export const getUserProfile = async (): Promise<UserInfo> => {
  try {
    const response = await api.get('/api/profile');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (profileData: Partial<UserInfo>): Promise<UserInfo> => {
  try {
    console.log('Updating profile with data:', profileData);
    const response = await api.put('/api/profile', profileData);
    console.log('Profile update response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Get user's activity feed
export const getUserActivities = async (): Promise<UserActivity[]> => {
  try {
    const response = await api.get('/api/profile/activity');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user activities:', error);
    return [];
  }
};

// Update user avatar/profile image
export const updateProfileImage = async (imageFile: File): Promise<string> => {
  try {
    // Create FormData
    const formData = new FormData();
    formData.append('profileImage', imageFile);
    
    // In a production app, this would upload to a storage service
    // For now, we'll simulate by converting to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // In a real implementation, you'd upload the file and get a URL back
          // Then update the profile with that URL
          updateUserProfile({ profileImage: reader.result })
            .then(() => resolve(reader.result as string))
            .catch(reject);
        } else {
          reject(new Error('Failed to convert image'));
        }
      };
      reader.onerror = reject;
    });
  } catch (error) {
    console.error('Error updating profile image:', error);
    throw error;
  }
};

export default {
  getUserProfile,
  updateUserProfile,
  getUserActivities,
  updateProfileImage
};
