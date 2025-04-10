import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section className="how-it-works-section" ref={React.createRef()}>
      <div className="section-container">
        <div className="section-heading">
          <div className="section-icon">
            <svg viewBox="0 0 24 24" width="32" height="32" stroke="#0070f3" fill="none" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            How It Works: Simplicity Meets Intelligence
          </h2>
          <div className="title-underline"></div>
        </div>
        <p className="section-subtitle">Get started in minutes with our simple three-step process</p>
        
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Connect Your Repository</h3>
            <p>Link your GitHub, GitLab, or Bitbucket repository with a few clicks, or paste your code directly.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>AI Analyzes Your Code</h3>
            <p>Our AI engine automatically scans your code for issues, bugs, and optimization opportunities.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Implement Suggestions</h3>
            <p>Review and apply suggested fixes with one click or customize them to your needs.</p>
          </div>
        </div>
        
        <div className="workflow-animation">
          <div className="animation-circle c1"></div>
          <div className="animation-circle c2"></div>
          <div className="animation-circle c3"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;