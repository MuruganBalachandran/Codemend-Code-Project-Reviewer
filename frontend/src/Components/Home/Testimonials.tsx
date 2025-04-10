import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section className="testimonials-section" ref={React.createRef()}>
      <div className="section-container">
        <div className="section-heading">
          <div className="section-icon">
            <svg viewBox="0 0 24 24" width="32" height="32" stroke="#0070f3" fill="none" strokeWidth="1.5">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            What Developers Say: Real Results, Real Praise
          </h2>
          <div className="title-underline"></div>
        </div>
        <p className="section-subtitle">Join thousands of developers who are building better software with CodeMend</p>
        
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="quote-mark">"</div>
            <p className="testimonial-content">
              CodeMend has completely transformed our development workflow. We've reduced bugs in production by 37% and our code quality has never been better. The AI suggestions are remarkably accurate.
            </p>
            <div className="testimonial-author">
              <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Sarah Johnson" className="author-avatar" />
              <div className="author-info">
                <h4>Sarah Johnson</h4>
                <p>Engineering Lead at TechCorp</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="quote-mark">"</div>
            <p className="testimonial-content">
              As a solo developer, CodeMend is like having a senior engineer reviewing my code 24/7. It's caught issues I would have missed and taught me better practices. Worth every penny!
            </p>
            <div className="testimonial-author">
              <img src="https://randomuser.me/api/portraits/men/54.jpg" alt="Michael Chen" className="author-avatar" />
              <div className="author-info">
                <h4>Michael Chen</h4>
                <p>Indie Developer</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="quote-mark">"</div>
            <p className="testimonial-content">
              Our team has saved countless hours of code review time. The AI suggestions are surprisingly insightful and have helped us standardize our codebase across multiple projects.
            </p>
            <div className="testimonial-author">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Emily Rodriguez" className="author-avatar" />
              <div className="author-info">
                <h4>Emily Rodriguez</h4>
                <p>CTO at StartupX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="testimonial-pattern"></div>
    </section>
  );
};

export default Testimonials;