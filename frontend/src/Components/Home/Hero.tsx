import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  isAuthenticated: boolean;
}

const Hero: React.FC<HeroProps> = ({ isAuthenticated }) => {
  // State for the animated code example
  const [codeStep, setCodeStep] = useState(0);
  
  // Function to progress the code animation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (codeStep < 5) {
        setCodeStep(prevStep => prevStep + 1);
      } else {
        // Reset animation after a pause
        setTimeout(() => setCodeStep(0), 2000);
      }
    }, 1400);
    
    return () => clearTimeout(timer);
  }, [codeStep]);

  return (
    <section className="hero-section" ref={React.createRef()}>
      <div className="hero-content">
        <h1>Transform Your Code with AI-Powered Brilliance</h1>
        <p>CodeMend intelligently analyzes, fixes, and optimizes your code to help you build better software, faster. Experience the future of development today.</p>
        <div className="hero-buttons">
          {isAuthenticated ? (
            <>
              <Link to="/review" className="cta-button">Start Code Review</Link>
              <Link to="/projects/new" className="secondary-cta">New Project</Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="cta-button pulse-animation">Get Started Free</Link>
              <Link to="/login" className="secondary-cta">Login</Link>
            </>
          )}
        </div>
      </div>
      <div className="hero-image">
        <div className="code-window">
          <div className="code-header">
            <div className="window-controls">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="file-name">main.ts</div>
          </div>
          <div className="code-content">
            <pre>
              <code>
                <span className="keyword">async function</span> <span className="function">fetchUserData</span>(<span className="param">userId: string</span>): <span className="keyword">Promise</span>&lt;User&gt; &#123;<br/>
                {codeStep >= 1 && (
                  <span className={`comment ${codeStep === 1 ? 'code-typing' : ''}`}>
                    {"  // AI detected potential issues"}
                  </span>
                )}
                <br/>
                {codeStep >= 2 && (
                  <>
                    <span className={`error ${codeStep === 2 ? 'code-typing' : ''}`}>
                      {"  const exampleUserId = '123'; // Example userId"}
                    </span>
                    <br/>
                    <span className={`error ${codeStep === 2 ? 'code-typing' : ''}`}>
                      {"  const response = await fetch(`/api/users/${exampleUserId}`);"}
                    </span>
                  </>
                )}
                <br/>
                {codeStep >= 2 && (
                  <span className={`error ${codeStep === 2 ? 'code-typing' : ''}`}>
                    {"  const user = await response.json();"}
                  </span>
                )}
                <br/>
                {codeStep >= 2 && (
                  <span className={`error ${codeStep === 2 ? 'code-typing' : ''}`}>
                    {"  if (user) return user;"}
                  </span>
                )}
                <br/>
                {codeStep >= 3 && (
                  <span className={`comment ${codeStep === 3 ? 'code-typing' : ''}`}>
                    {"  // ✓ Missing error handling"}
                  </span>
                )}
                <br/>
                {codeStep >= 3 && (
                  <span className={`comment ${codeStep === 3 ? 'code-typing' : ''}`}>
                    {"  // ✓ Not handling fetch rejections"}
                  </span>
                )}
                <br/>
                {codeStep >= 4 && (
                  <span className={`fix ${codeStep === 4 ? 'code-typing' : ''}`}>
                    {"  try {"}
                  </span>
                )}
                <br/>
                {codeStep >= 4 && (
                  <span className={`fix ${codeStep === 4 ? 'code-typing' : ''}`}>
                    {"    const response = await fetch(`/api/users/${exampleUserId}`);"}
                  </span>
                )}
                <br/>
                {codeStep >= 4 && (
                  <span className={`fix ${codeStep === 4 ? 'code-typing' : ''}`}>
                    {"    if (!response.ok) {"}
                  </span>
                )}
                <br/>
                {codeStep >= 4 && (
                  <span className={`fix ${codeStep === 4 ? 'code-typing' : ''}`}>
                    {"      throw new Error(`API error: ${response.status}`);"}
                  </span>
                )}
                <br/>
                {codeStep >= 4 && (
                  <span className={`fix ${codeStep === 4 ? 'code-typing' : ''}`}>
                    {"    }"}
                  </span>
                )}
                <br/>
                {codeStep >= 4 && (
                  <span className={`fix ${codeStep === 4 ? 'code-typing' : ''}`}>
                    {"    return await response.json();"}
                  </span>
                )}
                <br/>
                {codeStep >= 4 && (
                  <span className={`fix ${codeStep === 4 ? 'code-typing' : ''}`}>
                    {"  } catch (error) {"}
                  </span>
                )}
                <br/>
                {codeStep >= 4 && (
                  <span className={`fix ${codeStep === 4 ? 'code-typing' : ''}`}>
                    {"    console.error('Failed to fetch user:', error);"}
                  </span>
                )}
                <br/>
                {codeStep >= 4 && (
                  <span className={`fix ${codeStep === 4 ? 'code-typing' : ''}`}>
                    {"    throw error;"}
                  </span>
                )}
                <br/>
                {codeStep >= 4 && (
                  <span className={`fix ${codeStep === 4 ? 'code-typing' : ''}`}>
                    {"  }"}
                  </span>
                )}
                <br/>
                {codeStep >= 5 && (
                  <span className={`comment ${codeStep === 5 ? 'code-typing' : ''}`}>
                    {"  // ✅ Proper error handling & robust implementation"}
                  </span>
                )}
                <br/>
                {"}"}
              </code>
            </pre>
          </div>
        </div>
      </div>
      
      <div className="hero-pattern hero-pattern-1"></div>
      <div className="hero-pattern hero-pattern-2"></div>
    </section>
  );
};

export default Hero;