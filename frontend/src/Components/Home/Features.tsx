import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="features-section" ref={React.createRef()}>
      <div className="section-container">
        <div className="section-heading">
          <div className="section-icon">
            <svg viewBox="0 0 24 24" width="32" height="32" stroke="#0070f3" fill="none" strokeWidth="1.5">
              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"></path>
              <line x1="16" y1="8" x2="2" y2="22"></line>
            </svg>
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Powerful Features That Redefine Coding
          </h2>
          <div className="title-underline"></div>
        </div>
        <p className="section-subtitle">Our AI-powered platform helps you write better code, fix issues automatically, and learn best practices as you code.</p>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" stroke="#0070f3" fill="none" strokeWidth="1.5">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17.5" y1="15" x2="9" y2="15"></line>
              </svg>
            </div>
            <h3>Intelligent Code Fixes</h3>
            <p>Our AI automatically detects and fixes bugs, security vulnerabilities, and code smells before they reach production.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" stroke="#0070f3" fill="none" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <h3>Seamless Git Integration</h3>
            <p>Integrate with GitHub, GitLab, and Bitbucket to automatically review pull requests and suggest improvements in your workflow.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" stroke="#0070f3" fill="none" strokeWidth="1.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3>Performance Optimization</h3>
            <p>Identify bottlenecks and performance issues with our advanced analysis tools that suggest optimizations tailored to your codebase.</p>
          </div>
        </div>
      </div>
      <div className="feature-pattern"></div>
    </section>
  );
};

export default Features;