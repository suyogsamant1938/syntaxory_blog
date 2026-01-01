import { FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      {/* Animated Background Elements */}
      <div className="hero-bg">
        <div className="hero-gradient-1"></div>
        <div className="hero-gradient-2"></div>
        <div className="hero-gradient-3"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            <FiTrendingUp />
            <span>Join our growing community</span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-title">
            Share Your <span className="gradient-text">Technical</span> Journey
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            A premium platform for developers to share knowledge, learn from peers, 
            and create high-quality technical content.
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <Link to="/blogs" className="btn btn-primary btn-lg">
              Explore Blogs
              <FiArrowRight />
            </Link>
            <Link to="/create" className="btn btn-outline btn-lg">
              Start Writing
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="hero-floats">
          <div className="float-card float-1">
            <div className="float-icon">💻</div>
            <div className="float-text">Web Dev</div>
          </div>
          <div className="float-card float-2">
            <div className="float-icon">🚀</div>
            <div className="float-text">DevOps</div>
          </div>
          <div className="float-card float-3">
            <div className="float-icon">🤖</div>
            <div className="float-text">AI & ML</div>
          </div>
          <div className="float-card float-4">
            <div className="float-icon">📱</div>
            <div className="float-text">Mobile Dev</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
