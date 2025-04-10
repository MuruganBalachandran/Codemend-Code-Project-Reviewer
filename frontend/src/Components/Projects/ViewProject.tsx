import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../Pages/Projects/Projects.css'

interface Project {
  _id: string;
  name: string;
  description: string;
  lastModified: string;
  status: string;
  language: string;
  stars: number;
  isGithubLinked: boolean;
  projectImage: string;
  user_id: string;
}

const ViewProject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/api/projects/${id}`);
        setProject(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleBack = () => {
    navigate('/projects');
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!project) {
    return <div className="error">Project not found</div>;
  }

  return (
    <div className="view-project-container">
      <button className="back-button" onClick={handleBack}>
        ← Back to Projects
      </button>

      <div className="project-header">
        <h1>{project.name}</h1>
        <div className="project-meta">
          <span className={`status-badge ${project.status}`}>
            {project.status}
          </span>
          <span className="language-badge">
            {project.language}
          </span>
          {project.isGithubLinked && (
            <span className="github-badge">
              GitHub Linked
            </span>
          )}
        </div>
      </div>

      <div className="project-body">
        <div className="project-info">
          <div className="info-section">
            <h2>Description</h2>
            <p>{project.description}</p>
          </div>

          <div className="info-section">
            <h2>Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <label>Last Modified</label>
                <span>{new Date(project.lastModified).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <label>Stars</label>
                <span>{project.stars}</span>
              </div>
              <div className="detail-item">
                <label>Status</label>
                <span>{project.status}</span>
              </div>
              <div className="detail-item">
                <label>Language</label>
                <span>{project.language}</span>
              </div>
            </div>
          </div>

          {project.projectImage && (
            <div className="info-section">
              <h2>Project Image</h2>
              <img 
                src={project.projectImage} 
                alt={project.name} 
                className="project-image"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProject;