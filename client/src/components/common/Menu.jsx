import { Link } from 'react-router-dom';
import { FiX, FiHome, FiFileText, FiInfo, FiEdit, FiUser } from 'react-icons/fi';
import './Menu.css';

const Menu = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

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
              <Link to="/create" className="menu-link" onClick={onClose}>
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
