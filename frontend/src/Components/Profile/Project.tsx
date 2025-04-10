import React from 'react';
import { UserInfo } from '../../types/UserInfo';

interface ProjectProps {
  userData: UserInfo;
}

const Projects: React.FC<ProjectProps> = ({ userData }) => {
  return (
    <div className="profile-projects">
      <h2 className="section-title">Your Projects</h2>
      {userData.stats.projects > 0 ? (
        <div className="projects-grid">
          {/* This would be populated with actual project data when available */}
          <p>You have {userData.stats.projects} projects. Project listing will be displayed here...</p>
        </div>
      ) : (
        <div className="no-projects">
          <p>You haven't created any projects yet.</p>
          <button className="create-project-btn">Create Your First Project</button>
        </div>
      )}
    </div>
  );
};

export default Projects;