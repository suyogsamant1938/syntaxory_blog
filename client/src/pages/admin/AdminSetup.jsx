import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AdminSetup = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    if (!user?.email) {
      setError('You must be logged in to upgrade.');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      await api.post('/setup-admin', { email: user.email });
      setMessage('Success! You are now an Admin. Redirecting...');
      
      // Force reload to update auth state
      setTimeout(() => {
        window.location.href = '/admin';
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to upgrade. Check backend console.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '80vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        Admin Setup
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', maxWidth: '500px' }}>
        Click the button below to upgrade your current account ({user?.email}) to ADMIN role.
        This is a temporary setup page.
      </p>

      {message && (
        <div style={{ 
          padding: '1rem', 
          background: 'rgba(67, 233, 123, 0.1)', 
          color: 'var(--color-accent-green)',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          {message}
        </div>
      )}

      {error && (
        <div style={{ 
          padding: '1rem', 
          background: 'rgba(255, 107, 107, 0.1)', 
          color: 'var(--color-accent-orange)',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      <button 
        onClick={handleUpgrade} 
        disabled={isLoading || !user}
        className="btn btn-primary"
        style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
      >
        {isLoading ? 'Upgrading...' : 'Make Me Admin 🚀'}
      </button>

      {!user && (
        <p style={{ marginTop: '1rem', color: 'var(--color-accent-orange)' }}>
          Please login first to use this page.
        </p>
      )}
    </div>
  );
};

export default AdminSetup;
