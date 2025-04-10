import { useState, useEffect } from 'react';
import ProjectCard, { Project } from '../../Components/Projects/ProjectCard';
import './Projects.css';
import api from '../../services/api';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [projectSource, setProjectSource] = useState<'local' | 'github'>('local');
  
  // Fetch projects from MongoDB
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/api/projects');
        setProjects(response.data.data);
        setFilteredProjects(response.data.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);
  
  // Filter projects when search query or filters change
  useEffect(() => {
    let result = [...projects];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        project => 
          project.name.toLowerCase().includes(query) || 
          project.description.toLowerCase().includes(query) ||
          (project.tags && project.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(project => project.status === statusFilter);
    }
    
    setFilteredProjects(result);
  }, [searchQuery, statusFilter, projects]);
  
  const handleArchiveProject = (projectId: string) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? { ...project, status: project.status === 'archived' ? 'active' : 'archived' } 
          : project
      )
    );
  };
  
  const handleDeleteProject = (projectId: string) => {
    setProjects(prevProjects => 
      prevProjects.filter(project => project.id !== projectId)
    );
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
  };
  
  const toggleViewMode = () => {
    setViewMode(prevMode => prevMode === 'grid' ? 'list' : 'grid');
  };

  const handleProjectSourceChange = (source: 'local' | 'github') => {
    setProjectSource(source);
    setStatusFilter('all');
    setSearchQuery('');
  };
  
  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>My Projects</h1>
        
        <div className="project-source-toggle">
          <button 
            className={`source-button ${projectSource === 'local' ? 'active' : ''}`}
            onClick={() => handleProjectSourceChange('local')}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            Local Projects
          </button>
          <button 
            className={`source-button ${projectSource === 'github' ? 'active' : ''}`}
            onClick={() => handleProjectSourceChange('github')}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            GitHub Repositories
          </button>
        </div>
      </div>
      
      <div className="projects-toolbar">
        <div className="search-bar">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder={`Search ${projectSource === 'local' ? 'projects' : 'repositories'}...`} 
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        <div className="filter-controls">
          <div className="status-filters">
            <button 
              className={`status-filter ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleStatusFilterChange('all')}
            >
              All
            </button>
            {projectSource === 'local' ? (
              <>
                <button 
                  className={`status-filter ${statusFilter === 'active' ? 'active' : ''}`}
                  onClick={() => handleStatusFilterChange('active')}
                >
                  Active
                </button>
                <button 
                  className={`status-filter ${statusFilter === 'completed' ? 'active' : ''}`}
                  onClick={() => handleStatusFilterChange('completed')}
                >
                  Completed
                </button>
                <button 
                  className={`status-filter ${statusFilter === 'archived' ? 'active' : ''}`}
                  onClick={() => handleStatusFilterChange('archived')}
                >
                  Archived
                </button>
              </>
            ) : (
              <>
                <button 
                  className={`status-filter ${statusFilter === 'public' ? 'active' : ''}`}
                  onClick={() => handleStatusFilterChange('public')}
                >
                  Public
                </button>
                <button 
                  className={`status-filter ${statusFilter === 'private' ? 'active' : ''}`}
                  onClick={() => handleStatusFilterChange('private')}
                >
                  Private
                </button>
                <button 
                  className={`status-filter ${statusFilter === 'forked' ? 'active' : ''}`}
                  onClick={() => handleStatusFilterChange('forked')}
                >
                  Forked
                </button>
              </>
            )}
          </div>
          
          <button className="view-toggle" onClick={toggleViewMode} title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}>
            {viewMode === 'grid' ? (
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            )}
          </button>
        </div>
      </div>
      
      <div className="projects-content">
        <div className="projects-list">
          {filteredProjects.length === 0 ? (
            <div className="no-projects">
              <svg viewBox="0 0 24 24" width="48" height="48" stroke="#aaa" fill="none" strokeWidth="1.5">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <h3>No {projectSource === 'local' ? 'projects' : 'repositories'} found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className={`projects-grid ${viewMode}`}>
              {filteredProjects.map(project => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onArchive={handleArchiveProject}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
