import { useState, useEffect } from 'react';
import Hero from '../components/blog/Hero';
import BlogCard from '../components/blog/BlogCard';
import SubscribeSection from '../components/subscribe/SubscribeSection';
import blogService from '../services/blogService';
import './HomePage.css';

const HomePage = () => {
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
      // Get only the latest 6 blogs for homepage
      setBlogs(data.slice(0, 6));
    } catch (err) {
      setError(err.message || 'Failed to load blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <Hero />

      {/* Featured Blogs */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Latest Articles</h2>
            <p className="section-subtitle">
              Discover the latest insights from our community of developers
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
              <p>Loading amazing content...</p>
            </div>
          ) : blogs.length > 0 ? (
            <div className="blog-grid">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="no-blogs">
              <p>No blogs available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <SubscribeSection />
    </div>
  );
};

export default HomePage;
