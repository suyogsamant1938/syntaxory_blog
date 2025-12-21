import { useState, useEffect } from 'react';
import BlogGrid from '../components/blog/BlogGrid';
import blogService from '../services/blogService';
import './BlogsPage.css';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await blogService.getBlogs();
      setBlogs(data);
    } catch (err) {
      setError(err.message || 'Failed to load blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="blogs-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title gradient-text">All Blogs</h1>
          <p className="page-subtitle">
            Explore our collection of technical articles and tutorials
          </p>
        </div>

        {error && (
          <div className="error-container">
            <p className="error-text">{error}</p>
            <button onClick={fetchBlogs} className="btn btn-outline">
              Try Again
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner-large"></div>
            <p>Loading blogs...</p>
          </div>
        ) : (
          <BlogGrid initialBlogs={blogs} />
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
