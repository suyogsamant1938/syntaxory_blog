import { FiCode, FiUsers, FiZap, FiTrendingUp, FiHeart, FiShield } from 'react-icons/fi';
import './AboutPage.css';

const AboutPage = () => {
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
            and connect with a global community.
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join other developers sharing their knowledge on Syntaxory</p>
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
