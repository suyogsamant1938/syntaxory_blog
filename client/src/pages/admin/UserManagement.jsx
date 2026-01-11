import { useState, useEffect } from 'react';
import { FiSearch, FiTrash2, FiUsers } from 'react-icons/fi';
import adminService from '../../services/adminService';
import { useConfirm } from '../../contexts/ConfirmContext';
import { useToast } from '../../contexts/ToastContext';
import dayjs from 'dayjs';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const confirm = useConfirm();
  const { addToast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchQuery, roleFilter, users]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await adminService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Failed to load users');
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(user =>
        (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await adminService.updateUserRole(userId, newRole);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      addToast('User role updated successfully', 'success');
    } catch (err) {
      addToast(err.message || 'Failed to update user role', 'error');
    }
  };

  const handleDelete = async (userId) => {
    const isConfirmed = await confirm({
      title: 'Delete User?',
      message: 'Are you sure you want to delete this user? This action cannot be undone.',
      type: 'danger'
    });

    if (!isConfirmed) return;

    try {
      await adminService.deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      addToast('User deleted successfully', 'success');
    } catch (err) {
      addToast(err.message || 'Failed to delete user', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="user-management">
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-management">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Manage user accounts and roles</p>
        </div>
        <div className="user-count-badge">
          <FiUsers /> {users.length} Users
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search users by email or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Role:</label>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="USER">User</option>
            <option value="PAID_SUBSCRIBER">Paid Subscriber</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="error-container">
          <p className="error-text">{error}</p>
          <button onClick={fetchUsers} className="btn btn-outline">
            Try Again
          </button>
        </div>
      )}

      {/* Users Table */}
      <div className="table-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-info-cell">
                        <div className="user-avatar-small">
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className="user-name">{user.name || 'No Name'}</div>
                          <div className="user-email">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <select 
                        className={`role-select ${user.role.toLowerCase().replace('_', '-')}`}
                        value={user.role}
                        onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                        disabled={user.role === 'ADMIN'}
                      >
                        <option value="USER">User</option>
                        <option value="PAID_SUBSCRIBER">Subscriber</option>
                        {user.role === 'ADMIN' && <option value="ADMIN">Admin</option>}
                      </select>
                    </td>
                    <td>{dayjs(user.created_at).format('MMM D, YYYY')}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="action-btn delete"
                        title="Delete User"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '3rem' }}>
                    {searchQuery || roleFilter !== 'all'
                      ? 'No users match your filters'
                      : 'No users found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        {filteredUsers.length > 0 && (
          <div className="pagination">
            <p>{filteredUsers.length} user(s) found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
