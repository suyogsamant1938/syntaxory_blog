import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMenu, FiX, FiUser, FiLogOut, FiEdit } from 'react-icons/fi';
import './TopNavbar.css';

const TopNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null); // TODO: Connect to Supabase auth

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // TODO: Implement Supabase logout
    setUser(null);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
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
        </div>

        {/* Search & Actions */}
        <div className="navbar-actions">
          {/* Search */}
          <div className={`search-container ${isSearchOpen ? 'search-open' : ''}`}>
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button 
              className="search-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <FiSearch />
            </button>
          </div>

          {/* User Menu */}
          {user ? (
            <div className="user-menu">
              <button className="user-avatar">
                <FiUser />
              </button>
              <div className="user-dropdown">
                <Link to="/profile" className="dropdown-item">
                  <FiUser /> Profile
                </Link>
                <Link to="/create" className="dropdown-item">
                  <FiEdit /> Write Blog
                </Link>
                <button onClick={handleLogout} className="dropdown-item">
                  <FiLogOut /> Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/blogs" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Blogs
          </Link>
          <Link to="/about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          {!user && (
            <Link to="/login" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default TopNavbar;
