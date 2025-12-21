import { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import { FiSearch, FiFilter } from 'react-icons/fi';
import './BlogGrid.css';

const BlogGrid = ({ initialBlogs = [] }) => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [filteredBlogs, setFilteredBlogs] = useState(initialBlogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const allTags = ['all', 'React', 'JavaScript', 'Node.js', 'Python', 'CSS', 'DevOps', 'AI'];

  useEffect(() => {
    filterBlogs();
  }, [searchQuery, selectedTag, blogs]);

  const filterBlogs = () => {
    let filtered = [...blogs];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(blog =>
        blog.tags && blog.tags.includes(selectedTag)
      );
    }

    setFilteredBlogs(filtered);
  };

  return (
    <div className="blog-grid-container">
      {/* Filters */}
      <div className="blog-filters">
        {/* Search */}
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input-full"
          />
        </div>

        {/* Tags */}
        <div className="tag-filters">
          <FiFilter className="filter-icon" />
          <div className="tag-list">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag-filter ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <p>{filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'} found</p>
      </div>

      {/* Blog Grid */}
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <p>Loading blogs...</p>
        </div>
      ) : filteredBlogs.length > 0 ? (
        <div className="blog-grid">
          {filteredBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h3>No blogs found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default BlogGrid;
