import React from 'react';
import {  useNavigate } from 'react-router-dom';
import './ProjectCard.css';

export interface Project {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  status: 'active' | 'completed' | 'archived';
  language: string;
  stars?: number;
  isGithubLinked?: boolean;
  collaborators?: { id: string; name: string; avatar: string }[];
  tags?: string[];
}

interface ProjectCardProps {
  project: Project;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onArchive, onDelete }) => {
  const navigate = useNavigate();

  const getLanguageIcon = (language: string | undefined) => {
    if (!language) {
      return '📄'; // Default icon for undefined or null language
    }

    switch (language.toLowerCase()) {
      case 'javascript':
        return '🟨';
      case 'typescript':
        return '🔷';
      case 'python':
        return '🐍';
      case 'java':
        return '☕';
      case 'c#':
        return '🟪';
      case 'html':
        return '🟧';
      case 'css':
        return '🟦';
      default:
        return '📄';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'status-badge-active';
      case 'completed':
        return 'status-badge-completed';
      case 'archived':
        return 'status-badge-archived';
      default:
        return '';
    }
  };

  const handleArchive = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onArchive(project.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      onDelete(project.id);
    }
  };

  const handleViewProject = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/projects/${project.id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="project-card" onClick={handleViewProject}>
      <div className="project-card-header">
        <div className="project-language">
          <span className="language-icon">{getLanguageIcon(project.language)}</span>
          <span className="language-name">{project.language}</span>
        </div>
        <div className={`status-badge ${getStatusBadgeClass(project.status)}`}>
          {project.status}
        </div>
      </div>

      <div className="project-card-content">
        <h3 className="project-name">{project.name}</h3>
        <p className="project-description">{project.description}</p>
      </div>

      <div className="project-card-meta">
        <div className="project-date">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>Updated {formatDate(project.lastModified)}</span>
        </div>

        {project.isGithubLinked && (
          <div className="github-indicator">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </div>
        )}

        {project.stars !== undefined && (
          <div className="stars-indicator">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>{project.stars}</span>
          </div>
        )}
      </div>

      {project.tags && project.tags.length > 0 && (
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="project-tag">{tag}</span>
          ))}
        </div>
      )}

      {project.collaborators && project.collaborators.length > 0 && (
        <div className="project-collaborators">
          {project.collaborators.slice(0, 3).map((collaborator) => (
            <div key={collaborator.id} className="collaborator-avatar" title={collaborator.name}>
              {collaborator.avatar ? (
                <img src={collaborator.avatar} alt={collaborator.name} />
              ) : (
                <div className="avatar-placeholder">
                  {collaborator.name.charAt(0)}
                </div>
              )}
            </div>
          ))}
          {project.collaborators.length > 3 && (
            <div className="collaborator-more">+{project.collaborators.length - 3}</div>
          )}
        </div>
      )}

      <div className="project-card-actions">
        <button
          className="action-button view-button"
          title="View Project"
          onClick={handleViewProject}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>

        <button
          className="action-button archive-button"
          title={project.status === 'archived' ? 'Unarchive Project' : 'Archive Project'}
          onClick={handleArchive}
        >
          {project.status === 'archived' ? (
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
              <polyline points="12 3 20 3 22 7 20 11 12 11"></polyline>
              <path d="M12 3H4L2 7L4 11H12"></path>
              <rect x="2" y="14" width="20" height="8" rx="2"></rect>
              <line x1="12" y1="14" x2="12" y2="22"></line>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
              <polyline points="21 8 21 21 3 21 3 8"></polyline>
              <rect x="1" y="3" width="22" height="5"></rect>
              <line x1="10" y1="12" x2="14" y2="12"></line>
            </svg>
          )}
        </button>

        <button
          className="action-button delete-button"
          title="Delete Project"
          onClick={handleDelete}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;