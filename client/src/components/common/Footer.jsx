import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const { isAdmin, isPaidUser } = useAuth();
  const { addToast } = useToast();
  const currentYear = new Date().getFullYear();

  const handleWriteClick = (e) => {
    if (!isAdmin && !isPaidUser) {
      e.preventDefault();
      addToast('You must be a paid subscriber to write blogs.', 'error');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-row">
          {/* Left: Brand, Copyright & Socials */}
          <div className="footer-left">
            <div className="brand-group">
              <Link to="/" className="footer-brand gradient-text">Syntaxory</Link>
              <span className="divider">|</span>
              <p className="copyright">
                © {currentYear} • Made with <FiHeart className="heart-icon" />
              </p>
            </div>
            
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
            </div>
          </div>

          {/* Right: Nav Links */}
          <div className="footer-right">
            <nav className="footer-nav">
              <Link to="/">Home</Link>
              <Link to="/blogs">Blogs</Link>
              <Link to="/about">About</Link>
              <Link to="/create" onClick={handleWriteClick}>Write</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
