import React from 'react';

interface PullRequest {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  created: string;
  status: 'open' | 'closed' | 'merged';
  branch: string;
  baseBranch: string;
  commits: number;
  comments: number;
  additions: number;
  deletions: number;
  changedFiles: number;
  labels: string[];
}

interface PRComment {
  id: number;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  lineNumber?: number;
  fileName?: string;
  isReply?: boolean;
  replyTo?: number;
}

interface FileDiff {
  filename: string;
  status: 'modified' | 'added' | 'removed';
  additions: number;
  deletions: number;
  diff: string;
}

interface PullRequestsProps {
  pullRequests: PullRequest[];
  isLoadingPRs: boolean;
  selectedPR: PullRequest | null;
  prComments: PRComment[];
  fileDiffs: FileDiff[];
  prFilter: 'all' | 'open' | 'closed' | 'merged';
  prSort: 'newest' | 'oldest' | 'most-active';
  selectedFile: string | null;
  newComment: string;
  onSelectPR: (pr: PullRequest) => void;
  onPRAction: (action: 'approve' | 'request-changes' | 'merge' | 'close') => void;
  onFilterChange: (filter: 'all' | 'open' | 'closed' | 'merged') => void;
  onSortChange: (sort: 'newest' | 'oldest' | 'most-active') => void;
  onSelectFile: (filename: string) => void;
  onNewCommentChange: (text: string) => void;
  onAddComment: () => void;
}

const PullRequests: React.FC<PullRequestsProps> = ({
  pullRequests,
  isLoadingPRs,
  selectedPR,
  prComments,
  fileDiffs,
  prFilter,
  prSort,
  selectedFile,
  newComment,
  onSelectPR,
  onPRAction,
  onFilterChange,
  onSortChange,
  onSelectFile,
  onNewCommentChange,
  onAddComment
}) => {
  // Filter and sort PRs
  const filteredPRs = pullRequests.filter(pr => {
    if (prFilter === 'all') return true;
    return pr.status === prFilter;
  });

  const sortedPRs = [...filteredPRs].sort((a, b) => {
    if (prSort === 'newest') {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    } else if (prSort === 'oldest') {
      return new Date(a.created).getTime() - new Date(b.created).getTime();
    } else if (prSort === 'most-active') {
      return (b.comments + b.commits) - (a.comments + a.commits);
    }
    return 0;
  });

  if (isLoadingPRs) {
    return (
      <div className="loading-prs">
        <span className="spinner"></span>
        <p>Loading pull requests...</p>
      </div>
    );
  }

  if (selectedPR) {
    return (
      <div className="pr-detail-view">
        <button className="back-button" onClick={() => onSelectPR(null as any)}>
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to pull requests
        </button>
        
        <div className="pr-header">
          <div className="pr-title-section">
            <h3>
              <span className="pr-number">#{selectedPR.id}</span> {selectedPR.title}
            </h3>
            <div className="pr-status-badge" data-status={selectedPR.status}>
              {selectedPR.status === 'open' ? 'Open' : 
               selectedPR.status === 'merged' ? 'Merged' : 'Closed'}
            </div>
          </div>
          
          <div className="pr-meta">
            <div className="pr-author">
              <img src={selectedPR.authorAvatar} alt={selectedPR.author} className="avatar" />
              <span>{selectedPR.author}</span>
            </div>
            <div className="pr-created">
              created on {new Date(selectedPR.created).toLocaleDateString()}
            </div>
            <div className="pr-branch">
              <span className="branch-label">Branch:</span> {selectedPR.branch}
            </div>
          </div>
          
          <div className="pr-stats">
            <div className="pr-stat">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              {selectedPR.commits} commits
            </div>
            <div className="pr-stat">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2-2z"></path>
              </svg>
              {selectedPR.comments} comments
            </div>
            <div className="pr-stat">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              {selectedPR.changedFiles} changed files
            </div>
            <div className="pr-stat">
              <span className="additions">+{selectedPR.additions}</span>
              <span className="deletions">-{selectedPR.deletions}</span>
            </div>
          </div>
          
          {selectedPR.status === 'open' && (
            <div className="pr-actions">
              <button 
                className="pr-action-button approve"
                onClick={() => onPRAction('approve')}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Approve
              </button>
              <button 
                className="pr-action-button request-changes"
                onClick={() => onPRAction('request-changes')}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                Request Changes
              </button>
              <button 
                className="pr-action-button merge"
                onClick={() => onPRAction('merge')}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                  <circle cx="18" cy="18" r="3"></circle>
                  <circle cx="6" cy="6" r="3"></circle>
                  <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                  <line x1="6" y1="9" x2="6" y2="21"></line>
                </svg>
                Merge
              </button>
              <button 
                className="pr-action-button close"
                onClick={() => onPRAction('close')}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Close
              </button>
            </div>
          )}
        </div>
        
        <div className="pr-content">
          <div className="pr-files-list">
            <h4>Changed Files</h4>
            <ul>
              {fileDiffs.map(file => (
                <li 
                  key={file.filename}
                  className={`file-item ${file.status} ${selectedFile === file.filename ? 'selected' : ''}`}
                  onClick={() => onSelectFile(file.filename)}
                >
                  <div className="file-icon">
                    {file.status === 'added' && (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="#4caf50" fill="none" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                    )}
                    {file.status === 'modified' && (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="#ff9800" fill="none" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                    )}
                    {file.status === 'removed' && (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="#f44336" fill="none" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                    )}
                  </div>
                  <div className="file-name">{file.filename}</div>
                  <div className="file-changes">
                    <span className="additions">+{file.additions}</span>
                    <span className="deletions">-{file.deletions}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="pr-diff-view">
            {selectedFile ? (
              fileDiffs.find(f => f.filename === selectedFile) ? (
                <div className="diff-content">
                  <div className="diff-header">
                    <span className="diff-filename">{selectedFile}</span>
                  </div>
                  <pre className="diff-code">
                    {fileDiffs.find(f => f.filename === selectedFile)?.diff}
                  </pre>
                </div>
              ) : <p>Select a file to view changes</p>
            ) : (
              <div className="diff-placeholder">
                <svg viewBox="0 0 24 24" width="48" height="48" stroke="#aaa" fill="none" strokeWidth="1">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <p>Select a file from the list to view its changes</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="pr-comments-section">
          <h4>Comments</h4>
          <div className="comments-list">
            {prComments.map(comment => (
              <div key={comment.id} className={`comment-item ${comment.isReply ? 'reply' : ''}`}>
                <div className="comment-avatar">
                  <img src={comment.authorAvatar} alt={comment.author} />
                </div>
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-time">
                      {new Date(comment.timestamp).toLocaleString()}
                    </span>
                    {comment.fileName && (
                      <span className="comment-file">
                        on {comment.fileName}
                        {comment.lineNumber && `:${comment.lineNumber}`}
                      </span>
                    )}
                  </div>
                  <div className="comment-body">{comment.content}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="add-comment">
            <textarea 
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => onNewCommentChange(e.target.value)}
            ></textarea>
            <button 
              className="submit-comment"
              onClick={onAddComment}
              disabled={!newComment.trim()}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pr-filters">
        <div className="pr-status-filter">
          <button 
            className={`filter-button ${prFilter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            All
          </button>
          <button 
            className={`filter-button ${prFilter === 'open' ? 'active' : ''}`}
            onClick={() => onFilterChange('open')}
          >
            Open
          </button>
          <button 
            className={`filter-button ${prFilter === 'closed' ? 'active' : ''}`}
            onClick={() => onFilterChange('closed')}
          >
            Closed
          </button>
          <button 
            className={`filter-button ${prFilter === 'merged' ? 'active' : ''}`}
            onClick={() => onFilterChange('merged')}
          >
            Merged
          </button>
        </div>
        <div className="pr-sort">
          <label>Sort:</label>
          <select onChange={(e) => onSortChange(e.target.value as any)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="most-active">Most Active</option>
          </select>
        </div>
      </div>
      
      <div className="pr-list">
        {sortedPRs.length > 0 ? (
          sortedPRs.map(pr => (
            <div 
              key={pr.id} 
              className={`pr-item ${pr.status}`}
              onClick={() => onSelectPR(pr)}
            >
              <div className="pr-item-header">
                <h3>
                  <span className="pr-number">#{pr.id}</span> {pr.title}
                </h3>
                <div className={`pr-status-badge ${pr.status}`}>
                  {pr.status === 'open' ? 'Open' : 
                   pr.status === 'merged' ? 'Merged' : 'Closed'}
                </div>
              </div>
              
              <div className="pr-item-meta">
                <div className="pr-author">
                  <img src={pr.authorAvatar} alt={pr.author} className="avatar-small" />
                  <span>{pr.author}</span>
                </div>
                <div className="pr-date">
                  opened on {new Date(pr.created).toLocaleDateString()}
                </div>
                <div className="pr-labels">
                  {pr.labels.map(label => (
                    <span key={label} className={`pr-label ${label}`}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="pr-item-stats">
                <div className="pr-stat">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2-2z"></path>
                  </svg>
                  {pr.comments}
                </div>
                <div className="pr-stat">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  {pr.commits}
                </div>
                <div className="pr-changes">
                  <span className="additions">+{pr.additions}</span>
                  <span className="deletions">-{pr.deletions}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-prs-message">
            <p>No pull requests match your current filters.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PullRequests;