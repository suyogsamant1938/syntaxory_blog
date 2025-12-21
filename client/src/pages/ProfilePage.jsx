import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiStar, FiClock, FiEdit2, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import blogService from '../services/blogService';
import dayjs from 'dayjs';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, profile, isPaidUser, signOut } = useAuth();
  const { addToast } = useToast();
  const [userBlogs, setUserBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserBlogs();
    }
  }, [user]);

  const fetchUserBlogs = async () => {
    try {
      // Assuming blogService has a method to get blogs by author
      // If not, we might need to filter client-side or add an endpoint
      // For now, let's assume we can filter the public list or use a specific endpoint
      // Since we don't have a specific 'getMyBlogs' endpoint in the viewed code,
      // we'll try to fetch all and filter (not ideal for production but works for now)
      // OR better, we can add a getMyBlogs to blogService if the backend supports it.
      // Let's try to list all and filter by author_id for this MVP.
      
      const allBlogs = await blogService.getAllBlogs();
      const myBlogs = allBlogs.filter(blog => blog.author_id === user.id);
      setUserBlogs(myBlogs);
    } catch (error) {
      console.error('Error fetching user blogs:', error);
      addToast('Failed to load your blogs', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      addToast('Logged out successfully', 'success');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header glass">
          <div className="profile-avatar-large">
            {user.user_metadata?.name?.charAt(0) || user.email?.charAt(0) || 'U'}
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{user.user_metadata?.name || 'User'}</h1>
            <p className="profile-email">
              <FiMail /> {user.email}
            </p>
            <div className="profile-badges">
              <span className={`badge ${isPaidUser ? 'badge-pro' : 'badge-free'}`}>
                {isPaidUser ? <><FiStar /> Pro Member</> : 'Free Plan'}
              </span>
              <span className="badge badge-role">
                {profile?.role || 'User'}
              </span>
            </div>
          </div>
          <button className="btn btn-outline logout-btn" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </div>

        <div className="profile-content">
          <div className="section-header">
            <h2>My Publications</h2>
            <span className="blog-count">{userBlogs.length} Posts</span>
          </div>

          {isLoading ? (
            <div className="loading-spinner-container">
              <div className="loading-spinner"></div>
            </div>
          ) : userBlogs.length > 0 ? (
            <div className="user-blogs-grid">
              {userBlogs.map(blog => (
                <div key={blog.id} className="user-blog-card glass">
                  <div className="blog-card-content">
                    <h3 className="blog-card-title">{blog.title}</h3>
                    <p className="blog-card-excerpt">
                      {blog.content.substring(0, 100)}...
                    </p>
                    <div className="blog-card-meta">
                      <span className="blog-date">
                        <FiClock /> {dayjs(blog.created_at).format('MMM D, YYYY')}
                      </span>
                      <span className="blog-status published">Published</span>
                    </div>
                  </div>
                  <div className="blog-card-actions">
                    <button className="btn-icon" title="Edit">
                      <FiEdit2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No blogs yet</h3>
              <p>Share your knowledge with the world!</p>
              {isPaidUser ? (
                <a href="/create" className="btn btn-primary">Write your first post</a>
              ) : (
                <p className="upgrade-hint">Upgrade to Pro to start writing.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
