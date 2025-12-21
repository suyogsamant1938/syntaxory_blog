import { useState, useEffect } from 'react';
import Hero from '../components/blog/Hero';
import BlogCard from '../components/blog/BlogCard';
import SubscribeSection from '../components/subscribe/SubscribeSection';
import './HomePage.css';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch blogs from API
    // Temporary mock data
    const mockBlogs = [
      {
        id: '1',
        title: 'Getting Started with React Hooks',
        content: 'React Hooks have revolutionized the way we write React components. In this comprehensive guide, we will explore the most commonly used hooks and learn how to build custom hooks for your applications...',
        author_type: 'HUMAN',
        created_at: new Date().toISOString(),
        likes_count: 42,
        comments_count: 15,
        image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        tags: ['React', 'JavaScript', 'Frontend']
      },
      {
        id: '2',
        title: 'Building Scalable APIs with Node.js',
        content: 'Learn how to design and build production-ready RESTful APIs using Node.js and Express. We will cover best practices, authentication, error handling, and deployment strategies...',
        author_type: 'HUMAN',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        likes_count: 38,
        comments_count: 12,
        image_url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
        tags: ['Node.js', 'Backend', 'API']
      },
      {
        id: '3',
        title: 'Introduction to Machine Learning with Python',
        content: 'Dive into the world of machine learning with Python. This tutorial covers the fundamentals of ML, popular libraries like scikit-learn and TensorFlow, and practical examples...',
        author_type: 'AI',
        created_at: new Date(Date.now() - 172800000).toISOString(),
        likes_count: 56,
        comments_count: 23,
        image_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
        tags: ['Python', 'AI', 'Machine Learning']
      },
      {
        id: '4',
        title: 'CSS Grid vs Flexbox: When to Use Which',
        content: 'Understanding the differences between CSS Grid and Flexbox is crucial for modern web development. Learn when to use each layout system and how to combine them effectively...',
        author_type: 'HUMAN',
        created_at: new Date(Date.now() - 259200000).toISOString(),
        likes_count: 31,
        comments_count: 8,
        image_url: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800',
        tags: ['CSS', 'Frontend', 'Web Design']
      },
      {
        id: '5',
        title: 'Docker for Developers: A Complete Guide',
        content: 'Master Docker containerization for your development workflow. From basic concepts to advanced orchestration with Docker Compose, this guide has everything you need...',
        author_type: 'HUMAN',
        created_at: new Date(Date.now() - 345600000).toISOString(),
        likes_count: 45,
        comments_count: 18,
        image_url: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800',
        tags: ['Docker', 'DevOps', 'Containers']
      },
      {
        id: '6',
        title: 'TypeScript Best Practices for 2024',
        content: 'Explore the latest TypeScript features and best practices that will make your code more maintainable, type-safe, and efficient. Includes real-world examples and patterns...',
        author_type: 'HUMAN',
        created_at: new Date(Date.now() - 432000000).toISOString(),
        likes_count: 52,
        comments_count: 20,
        image_url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
        tags: ['TypeScript', 'JavaScript', 'Best Practices']
      }
    ];

    setTimeout(() => {
      setBlogs(mockBlogs);
      setIsLoading(false);
    }, 1000);
  }, []);

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

          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner-large"></div>
              <p>Loading amazing content...</p>
            </div>
          ) : (
            <div className="blog-grid">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
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
