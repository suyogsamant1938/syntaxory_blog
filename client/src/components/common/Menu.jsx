import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { FiX, FiHome, FiFileText, FiInfo, FiEdit, FiUser } from 'react-icons/fi';
import './Menu.css';

const Menu = ({ isOpen, onClose }) => {
  const { user, isAdmin, isPaidUser } = useAuth();
  const { addToast } = useToast();

  if (!isOpen) return null;

  const handleWriteClick = (e) => {
    if (!isAdmin && !isPaidUser) {
      e.preventDefault();
      addToast('You must be a paid subscriber to write blogs.', 'error');
      return;
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="menu-backdrop" onClick={onClose}></div>

      {/* Menu Panel */}
      <div className="menu-panel">
        {/* Header */}
        <div className="menu-header">
          <h2 className="menu-title gradient-text">Menu</h2>
          <button className="menu-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="menu-nav">
          <Link to="/" className="menu-link" onClick={onClose}>
            <FiHome />
            <span>Home</span>
          </Link>
          <Link to="/blogs" className="menu-link" onClick={onClose}>
            <FiFileText />
            <span>Blogs</span>
          </Link>
          <Link to="/about" className="menu-link" onClick={onClose}>
            <FiInfo />
            <span>About</span>
          </Link>
          {user && (
            <>
              <Link 
                to="/create" 
                className="menu-link" 
                onClick={handleWriteClick}
              >
                <FiEdit />
                <span>Write Blog</span>
              </Link>
              <Link to="/profile" className="menu-link" onClick={onClose}>
                <FiUser />
                <span>Profile</span>
              </Link>
            </>
          )}
        </nav>

        {/* CTA */}
        {!user && (
          <div className="menu-cta">
            <Link to="/login" className="btn btn-primary" onClick={onClose}>
              Get Started
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;
