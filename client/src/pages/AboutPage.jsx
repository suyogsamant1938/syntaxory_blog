import { FiCode, FiUsers, FiZap, FiTrendingUp, FiHeart, FiShield } from 'react-icons/fi';
import './AboutPage.css';

const AboutPage = () => {
  const features = [
    {
      icon: <FiCode />,
      title: 'Developer-First',
      description: 'Built by developers, for developers. We understand your needs.'
    },
    {
      icon: <FiUsers />,
      title: 'Community Driven',
      description: 'Join a thriving community of passionate tech enthusiasts.'
    },
    {
      icon: <FiZap />,
      title: 'AI-Powered',
      description: 'Leverage AI to enhance your writing and reach more readers.'
    },
    {
      icon: <FiTrendingUp />,
      title: 'Analytics',
      description: 'Track your content performance with detailed insights.'
    },
    {
      icon: <FiHeart />,
      title: 'Ad-Free',
      description: 'Focus on content without distractions. Premium experience.'
    },
    {
      icon: <FiShield />,
      title: 'Secure',
      description: 'Your data is protected with enterprise-grade security.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">
            About <span className="gradient-text">Syntaxory</span>
          </h1>
          <p className="about-lead">
            A premium platform empowering developers to share knowledge,
            build their brand, and connect with a global community.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At Syntaxory, we believe that knowledge sharing is the cornerstone
                of innovation. Our mission is to provide developers with the best
                platform to document their journey, share their expertise, and
                learn from peers around the world.
              </p>
              <p>
                We're building more than just a blogging platform – we're creating
                a community where technical excellence meets creative expression.
              </p>
            </div>
            <div className="mission-stats">
              <div className="stat-box">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Active Developers</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">5K+</div>
                <div className="stat-label">Published Articles</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Monthly Readers</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">100+</div>
                <div className="stat-label">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Syntaxory?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of developers sharing their knowledge on Syntaxory</p>
            <div className="cta-buttons">
              <a href="/login" className="btn btn-primary btn-lg">Get Started</a>
              <a href="/blogs" className="btn btn-outline btn-lg">Explore Blogs</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
