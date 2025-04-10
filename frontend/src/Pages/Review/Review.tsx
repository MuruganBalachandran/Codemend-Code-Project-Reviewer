import { useState } from 'react';
import CodeReview from '../../Components/Review/CodeReview';
import ProjectReview from '../../Components/Review/ProjectReview';
import './Review.css';

type ReviewType = 'code' | 'project';

const Review = () => {
  const [reviewType, setReviewType] = useState<ReviewType>('code');

  return (
    <div className="review-container">
      <div className="review-header">
        <h1>Code Analysis & Review</h1>
        <p>Get AI-powered suggestions to improve your code quality and architecture</p>
        
        <div className="review-type-toggle">
          <button 
            className={`toggle-button ${reviewType === 'code' ? 'active' : ''}`}
            onClick={() => setReviewType('code')}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M16 18l6-6-6-6"></path>
              <path d="M8 6l-6 6 6 6"></path>
            </svg>
            Code Review
          </button>
          <button 
            className={`toggle-button ${reviewType === 'project' ? 'active' : ''}`}
            onClick={() => setReviewType('project')}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            Project Review
          </button>
        </div>
      </div>
      
      <div className="review-content">
        {reviewType === 'code' ? <CodeReview /> : <ProjectReview />}
      </div>
    </div>
  );
};

export default Review;