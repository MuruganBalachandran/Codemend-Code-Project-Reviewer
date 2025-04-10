import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Home.css';

// Import components
import Hero from '../../Components/Home/Hero';
import Features from '../../Components/Home/Features';
import HowItWorks from '../../Components/Home/HowItWorks';
import Testimonials from '../../Components/Home/Testimonials';

const Home = () => {
  const { isAuthenticated } = useAuth();
  
  // Refs for intersection observer animations
  const showcaseRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Set up intersection observer for animations
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, options);

    // Observe remaining sections
    [showcaseRef.current, ctaRef.current].forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      [showcaseRef.current, ctaRef.current].forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <Hero isAuthenticated={isAuthenticated} />

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Product Showcase Section */}
      <section className="product-showcase" ref={showcaseRef}>
        <div className="showcase-container">
          <div className="showcase-content">
            <div className="section-heading left-aligned">
              <div className="section-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="#0070f3" fill="none" strokeWidth="1.5">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
              </div>
              <h2>Beyond Code Reviews: The Complete Development Companion</h2>
              <div className="title-underline"></div>
            </div>
            <p>CodeMend doesn't just find problems—it helps you become a better developer with educational insights and best practices tailored to your coding style.</p>
            
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-check">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p>Automated security vulnerability detection</p>
              </div>
              <div className="feature-item">
                <div className="feature-check">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p>Performance optimization suggestions</p>
              </div>
              <div className="feature-item">
                <div className="feature-check">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p>Readability and maintainability improvements</p>
              </div>
              <div className="feature-item">
                <div className="feature-check">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p>Learning resources tailored to your code</p>
              </div>
            </div>
            
            <Link to="/features" className="cta-button">Explore All Features</Link>
          </div>
          
          <div className="showcase-image">
            <div className="image-container">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80" alt="Developer using CodeMend" />
              <div className="image-overlay">
                <div className="analytics-badge">
                  <span className="analytics-title">Code Improvement</span>
                  <span className="analytics-value">+42%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" ref={ctaRef}>
        <div className="cta-content">
          <h2>Ready to write better code today?</h2>
          <p>Join thousands of developers who are building better software with CodeMend.</p>
          
          <div className="cta-buttons">
            <Link
              to={isAuthenticated ? "/review" : "/signup"}
              className="cta-button white pulse-animation review-btn"
            >
              {isAuthenticated ? "Start a Review" : "Try For Free"}
            </Link>
            {!isAuthenticated && (
              <Link to="/pricing" className="cta-button">
                View Pricing
              </Link>
            )}
          </div>
          
          <p className="cta-subtext">No credit card required. Free tier includes 100 code reviews per month.</p>
        </div>
        <div className="cta-pattern"></div>
      </section>
    </div>
  );
};

export default Home;