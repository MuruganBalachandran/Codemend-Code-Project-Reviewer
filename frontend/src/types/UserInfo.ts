// User Info interface for complete profile data

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  icon: string;
  date: string;
}

export interface UserStats {
  projects: number;
  codeReviews: number;
  suggestions: number;
  reputation: number;
  contributionStreak?: number;
  lastContribution?: string;
}

export interface PrivacySettings {
  email: boolean;
  location: boolean;
  activity: boolean;
  projects: boolean;
  contributions: boolean;
  [key: string]: boolean;
}

export interface SocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
  [key: string]: string | undefined;
}

export interface UserActivity {
  id: string;
  type: 'project' | 'review' | 'comment' | 'suggestion';
  title: string;
  date: string;
  projectId?: string;
  projectName?: string;
  content?: string;
}

export interface UserInfo {
  createdAt: string;
  name: string;
  _id: string;
  id: string;
  userId: string;
  fullName: string;
  username: string;
  email: string;
  profileImage: string;
  bio: string;
  location: string;
  website: string;
  github: string;
  joinDate: string;
  skills: string[];
  interests: string[];
  achievements: Achievement[];
  stats: UserStats;
  privacy: PrivacySettings;
  socialLinks?: SocialLinks;
  theme?: 'light' | 'dark' | 'system';
  activities?: UserActivity[];
  updatedAt?: string;
}

export default UserInfo;
