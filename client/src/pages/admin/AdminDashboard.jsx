import { useState, useEffect } from 'react';
import { FiFileText, FiUsers, FiEye, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import StatCard from '../../components/admin/StatCard';
import adminService from '../../services/adminService';
import dayjs from 'dayjs';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalUsers: 0,
    totalViews: 0,
    totalLikes: 0,
  });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError('');

      const [statsData, blogsData, usersData] = await Promise.all([
        adminService.getStats(),
        adminService.getRecentBlogs(5),
        adminService.getRecentUsers(5),
      ]);

      setStats(statsData);
      setRecentBlogs(blogsData);
      setRecentUsers(usersData);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const statsCards = [
    {
      icon: <FiFileText />,
      title: 'Total Blogs',
      value: stats.totalBlogs.toString(),
      change: '+12%',
      changeType: 'positive'
    },
    {
      icon: <FiUsers />,
      title: 'Total Users',
      value: stats.totalUsers.toString(),
      change: '+8%',
      changeType: 'positive'
    },
    {
      icon: <FiEye />,
      title: 'Page Views',
      value: stats.totalViews.toLocaleString(),
      change: '+23%',
      changeType: 'positive'
    },
    {
      icon: <FiHeart />,
      title: 'Total Likes',
      value: stats.totalLikes.toString(),
      change: '+15%',
      changeType: 'positive'
    }
  ];

  if (isLoading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-container">
          <p className="error-text">{error}</p>
          <button onClick={fetchDashboardData} className="btn btn-outline">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statsCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="content-grid">
        {/* Recent Blogs */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">Recent Blogs</h2>
            <Link to="/admin/blogs" className="view-all-link">View All</Link>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author Type</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentBlogs.length > 0 ? (
                  recentBlogs.map((blog) => (
                    <tr key={blog.id}>
                      <td className="blog-title-cell">{blog.title}</td>
                      <td>{blog.author_type || 'HUMAN'}</td>
                      <td>
                        <span className={`status-badge ${blog.is_published ? 'published' : 'draft'}`}>
                          {blog.is_published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>{dayjs(blog.created_at).format('MMM D, YYYY')}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                      No blogs yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Users */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">Recent Users</h2>
            <Link to="/admin/users" className="view-all-link">View All</Link>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.length > 0 ? (
                  recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="email-cell">{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role.toLowerCase().replace('_', '-')}`}>
                          {user.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td>{dayjs(user.created_at).format('MMM D, YYYY')}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>
                      No users yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
