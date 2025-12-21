import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiClock, FiArrowLeft } from 'react-icons/fi';
import blogService from '../services/blogService';
import LikeButton from '../components/blog/LikeButton';
import CommentSection from '../components/blog/CommentSection';
import dayjs from 'dayjs';
import './BlogDetailPage.css';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setIsLoading(true);
      const data = await blogService.getBlogById(id);
      setBlog(data);
    } catch (err) {
      setError(err.message || 'Failed to load blog post');
      console.error('Error fetching blog:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="blog-detail-page">
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-detail-page">
        <div className="error-container">
          <h2>Oops! Something went wrong.</h2>
          <p>{error || 'Blog post not found'}</p>
          <Link to="/blogs" className="btn btn-primary">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <div className="container">
        <Link to="/blogs" className="back-link">
          <FiArrowLeft /> Back to Blogs
        </Link>

        <article className="blog-article">
          <header className="article-header">
            <div className="article-meta">
              <span className="category-badge">{blog.category || 'Technology'}</span>
              <span className="publish-date">
                <FiCalendar /> {dayjs(blog.created_at).format('MMMM D, YYYY')}
              </span>
            </div>
            
            <h1 className="article-title">{blog.title}</h1>
            
            <div className="author-info">
              <div className="author-avatar">
                {blog.author_name?.charAt(0) || 'A'}
              </div>
              <div className="author-details">
                <span className="author-name">{blog.author_name || 'Anonymous'}</span>
                <span className="read-time">
                  <FiClock /> {Math.ceil(blog.content.length / 1000)} min read
                </span>
              </div>
            </div>
          </header>

          {blog.image_url && (
            <div className="article-image-container">
              <img src={blog.image_url} alt={blog.title} className="article-image" />
            </div>
          )}

          <div className="article-content">
            {/* Simple rendering for now. Ideally use a markdown renderer */}
            {blog.content.split('\n').map((paragraph, index) => (
              paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
            ))}
          </div>

          <div className="article-actions">
            <LikeButton blogId={blog.id} initialLikes={blog.likes_count} />
            {/* Share button could go here */}
          </div>

          <CommentSection blogId={blog.id} />
        </article>
      </div>
    </div>
  );
};

export default BlogDetailPage;
