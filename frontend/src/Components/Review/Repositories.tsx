import React from 'react';

interface RepositoriesProps {
  repositories: string[];
  selectedRepository: string;
  isReviewing: boolean;
  onSelectRepository: (repo: string) => void;
  onReviewProject: () => void;
}

const Repositories: React.FC<RepositoriesProps> = ({
  repositories,
  selectedRepository,
  isReviewing,
  onSelectRepository,
  onReviewProject
}) => {
  return (
    <div className="repository-selection">
      <h3>Select a Repository</h3>
      <div className="repository-list">
        {repositories.map(repo => (
          <div
            key={repo}
            className={`repository-item ${selectedRepository === repo ? 'selected' : ''}`}
            onClick={() => onSelectRepository(repo)}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            {repo}
          </div>
        ))}
      </div>

      <button
        className="review-button"
        onClick={onReviewProject}
        disabled={!selectedRepository || isReviewing}
      >
        {isReviewing ? (
          <>
            <span className="spinner"></span>
            Analyzing Repository...
          </>
        ) : (
          'Review Repository'
        )}
      </button>
    </div>
  );
};

export default Repositories;