import { useState, useEffect } from 'react';
import BlogGrid from '../components/blog/BlogGrid';
import './BlogsPage.css';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch from API
    const mockBlogs = [
      {
        id: '1',
        title: 'Getting Started with React Hooks',
        content: 'React Hooks have revolutionized the way we write React components...',
        author_type: 'HUMAN',
        created_at: new Date().toISOString(),
        likes_count: 42,
        comments_count: 15,
        image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        tags: ['React', 'JavaScript']
      },
      {
        id: '2',
        title: 'Building Scalable APIs with Node.js',
        content: 'Learn how to design and build production-ready RESTful APIs...',
        author_type: 'HUMAN',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        likes_count: 38,
        comments_count: 12,
        image_url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
        tags: ['Node.js', 'JavaScript']
      },
      {
        id: '3',
        title: 'Introduction to Machine Learning with Python',
        content: 'Dive into the world of machine learning with Python...',
        author_type: 'AI',
        created_at: new Date(Date.now() - 172800000).toISOString(),
        likes_count: 56,
        comments_count: 23,
        image_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
        tags: ['Python', 'AI']
      }
    ];

    setTimeout(() => {
      setBlogs(mockBlogs);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="blogs-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title gradient-text">All Blogs</h1>
          <p className="page-subtitle">
            Explore our collection of technical articles and tutorials
          </p>
        </div>

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
