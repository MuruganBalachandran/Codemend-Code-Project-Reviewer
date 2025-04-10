import './About.css';

const About = () => {
  // Team member data
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'CEO & Co-founder',
      bio: 'Former Senior Engineer at Google with 10+ years experience in AI and software development. Sarah leads our vision and strategic direction.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      name: 'Michael Roberts',
      role: 'CTO & Co-founder',
      bio: 'Previously led engineering teams at Microsoft. Michael oversees our technical infrastructure and AI model development.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      name: 'Priya Sharma',
      role: 'Head of Product',
      bio: 'Product strategy expert with experience at Stripe and Atlassian. Priya ensures our solutions solve real developer problems.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Lead Engineer',
      bio: 'Full-stack developer with expertise in building developer tools. David leads our core code analysis engine development.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    }
  ];

  // Core values data
  const coreValues = [
    {
      id: 1,
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do, from our code to our customer service.',
      icon: 'trophy'
    },
    {
      id: 2,
      title: 'Innovation',
      description: 'We continuously push boundaries to create cutting-edge solutions that solve real problems.',
      icon: 'lightbulb'
    },
    {
      id: 3,
      title: 'Integrity',
      description: 'We believe in transparency, honesty, and doing whats right, even when its challenging.',
      icon: 'shield'
    },
    {
      id: 4,
      title: 'Community',
      description: 'We areommitted to giving back to the developer community and fostering collaboration.',
      icon: 'users'
    }
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About CodeMend</h1>
        <p className="about-subtitle">Building the future of code quality, one fix at a time</p>
      </div>
      
      {/* Mission Statement Section */}
      <section className="about-section mission-section">
        <div className="section-content">
          <h2>Our Mission</h2>
          <div className="mission-content">
            <div className="mission-text">
              <p className="mission-statement">
                To transform software development by making high-quality code accessible to all developers, 
                regardless of experience level, through intelligent AI-powered tools.
              </p>
              <p>
                At CodeMend, we believe that everyone deserves to write exceptional code. Our platform bridges the gap 
                between junior and senior developers by providing real-time, contextual fixes and suggestions that not 
                only solve immediate problems but teach best practices along the way.
              </p>
              <p>
                Founded in 2023 by a team of passionate engineers, we've helped over 10,000 developers improve their 
                code quality and reduce bugs by an average of 40%.
              </p>
            </div>
            <div className="mission-image">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Team collaborating" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Values Section */}
      <section className="about-section values-section">
        <div className="section-content">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            {coreValues.map(value => (
              <div className="value-card" key={value.id}>
                <div className="value-icon">
                  {value.icon === 'trophy' && (
                    <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" fill="none" strokeWidth="2">
                      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"></path>
                      <path d="M15 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                      <path d="M18 9h-3v2l2 3 2-3v-2h-3z"></path>
                      <path d="M11.43 2.64c-.19-.22-.54-.09-.6.2-.96 4.69-6.83 8.19-6.83 12.06 0 4.53 3.2 6.2 5.12 8.05C9.83 23.78 11 23 11 23c-.19-.98-.38-1.71.38-2.67C12.59 19.08 14 17.1 14 15.8c0-3.89 2.3-6.57 4.44-9.31.19-.24-.06-.56-.34-.47-2.46.8-5.31.41-6.67-3.38z"></path>
                    </svg>
                  )}
                  {value.icon === 'lightbulb' && (
                    <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" fill="none" strokeWidth="2">
                      <path d="M9 18h6"></path>
                      <path d="M10 22h4"></path>
                      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8c0-1-.26-1.9-.8-2.73A4.93 4.93 0 0 0 12 2.05c-1.97.05-3.8 1.17-4.6 2.72-.78 1.54-1.02 3.3-.57 5.08.32 1.27.96 2.13 1.42 2.65.44.53.84.97 1.2 1.47.34.5.64 1.02.84 1.76.08.26.17.59.25.96"></path>
                    </svg>
                  )}
                  {value.icon === 'shield' && (
                    <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" fill="none" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  )}
                  {value.icon === 'users' && (
                    <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" fill="none" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  )}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="about-section team-section">
        <div className="section-content">
          <h2>Meet Our Team</h2>
          <p className="team-intro">
            We're a diverse team of engineers, designers, and AI experts passionate about making code better.
          </p>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div className="team-card" key={member.id}>
                <div className="team-member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-member-info">
                  <h3>{member.name}</h3>
                  <span className="member-role">{member.role}</span>
                  <p className="member-bio">{member.bio}</p>
                  <div className="member-social">
                    <a href="#" aria-label="LinkedIn">
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a href="#" aria-label="GitHub">
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                    <a href="#" aria-label="Twitter">
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="about-section contact-section">
        <div className="section-content">
          <h2>Get in Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <p>Have questions about our product or interested in partnership opportunities? We'd love to hear from you!</p>
              <div className="contact-details">
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <a href="mailto:hello@codemend.ai">hello@codemend.ai</a>
                </div>
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>San Francisco, CA</span>
                </div>
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>(555) 123-4567</span>
                </div>
              </div>
              <div className="social-links">
                <a href="#" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="Your email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="Subject" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} placeholder="Your message" required></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
