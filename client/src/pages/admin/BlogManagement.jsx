import { useState, useEffect } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiEye, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import blogService from '../../services/blogService';
import dayjs from 'dayjs';
import './BlogManagement.css';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [searchQuery, statusFilter, blogs]);

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

  const filterBlogs = () => {
    let filtered = [...blogs];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      const isPublished = statusFilter === 'published';
      filtered = filtered.filter(blog => blog.is_published === isPublished);
    }

    setFilteredBlogs(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (err) {
      alert(err.message || 'Failed to delete blog');
    }
  };

  if (isLoading) {
    return (
      <div className="blog-management">
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <p>Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-management">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Blog Management</h1>
          <p className="page-subtitle">Manage all blog posts</p>
        </div>
        <Link to="/create" className="btn btn-primary">
          <FiPlus /> New Blog
        </Link>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="error-container">
          <p className="error-text">{error}</p>
          <button onClick={fetchBlogs} className="btn btn-outline">
            Try Again
          </button>
        </div>
      )}

      {/* Blogs Table */}
      <div className="table-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author Type</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id}>
                    <td className="blog-title-cell">{blog.title}</td>
                    <td>{blog.author_type || 'HUMAN'}</td>
                    <td>
                      <span className={`status-badge ${blog.is_published ? 'published' : 'draft'}`}>
                        {blog.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>{dayjs(blog.created_at).format('MMM D, YYYY')}</td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/blog/${blog.id}`} className="action-btn view">
                          <FiEye /> View
                        </Link>
                        <Link to={`/edit/${blog.id}`} className="action-btn edit">
                          <FiEdit2 /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="action-btn delete"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '3rem' }}>
                    {searchQuery || statusFilter !== 'all'
                      ? 'No blogs match your filters'
                      : 'No blogs yet. Create your first blog!'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        {filteredBlogs.length > 0 && (
          <div className="pagination">
            <p>{filteredBlogs.length} blog(s) found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;
