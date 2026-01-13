import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { FiSearch, FiMenu, FiX, FiUser, FiEdit, FiLogOut, FiShield } from 'react-icons/fi';
import Menu from './Menu';
import './TopNavbar.css';

const TopNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user, profile, isAuthenticated, isAdmin, isPaidUser, signOut } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    console.log('TopNavbar: handleLogout clicked');
    try {
      await signOut();
      console.log('TopNavbar: signOut completed, navigating home');
      setIsDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const handleWriteClick = (e) => {
    if (!isAdmin && !isPaidUser) {
      e.preventDefault();
      addToast('You must be a paid subscriber to write blogs.', 'error');
      return;
    }
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-text gradient-text">Syntaxory</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/blogs" className="nav-link">Blogs</Link>
            <Link to="/about" className="nav-link">About</Link>
            {isAuthenticated && <Link to="/profile" className="nav-link">Profile</Link>}
          </div>

          {/* Search & Actions */}
          <div className="navbar-actions">
            {/* Search */}
            <div className={`search-container ${isSearchExpanded ? 'expanded' : ''}`}>
              <input
                type="text"
                placeholder="Search blogs..."
                className="search-input"
              />
              <button 
                className="search-btn"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              >
                <FiSearch />
              </button>
            </div>

            {/* User Section */}
            <div className="nav-user">
              {isAuthenticated && (
                <Link 
                  to="/create" 
                  className="btn btn-primary btn-sm write-btn"
                  onClick={handleWriteClick}
                >
                  <FiEdit /> <span className="write-text">Write</span>
                </Link>
              )}
              {isAuthenticated ? (
                <div className="user-menu">
                  <button 
                    className="user-avatar"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {user?.user_metadata?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="user-dropdown">
                      <div className="dropdown-header">
                        <p className="user-name">{user?.user_metadata?.name || 'User'}</p>
                        <p className="user-email">{user?.email}</p>
                      </div>
                      <div className="dropdown-menu">
                        <Link to="/profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                          <FiUser /> Profile
                        </Link>
                        <Link 
                          to="/create" 
                          className="dropdown-item" 
                          onClick={handleWriteClick}
                        >
                          <FiEdit /> Write Blog
                        </Link>
                        {isAdmin && (
                          <Link to="/admin" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                            <FiShield /> Admin Dashboard
                          </Link>
                        )}
                        <button className="dropdown-item logout" onClick={handleLogout}>
                          <FiLogOut /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default TopNavbar;
