import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-gradient"></div>
      
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <h3 className="footer-brand gradient-text">Syntaxory</h3>
            <p className="footer-description">
              A premium tech blogging platform for developers, by developers.
              Share your knowledge and learn from the community.
            </p>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FiGithub />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FiTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FiLinkedin />
              </a>
              <a href="mailto:contact@syntaxory.com" className="social-link">
                <FiMail />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/create">Write a Blog</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-section">
            <h4 className="footer-title">Resources</h4>
            <ul className="footer-links">
              <li><Link to="/docs">Documentation</Link></li>
              <li><Link to="/api">API Reference</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h4 className="footer-title">Stay Updated</h4>
            <p className="newsletter-text">
              Subscribe to our newsletter for the latest tech articles and updates.
            </p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} Syntaxory. Made with <FiHeart className="heart-icon" /> by developers.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
