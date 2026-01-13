import { useState } from 'react';
import { FiCheck, FiZap, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import stripeService from '../../services/stripeService';
import './SubscribeSection.css';

const SubscribeSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, isPaidUser, loading, profile } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Wait for auth check and profile load to prevent flash
  if (loading || (isAuthenticated && !profile)) {
    return null;
  }

  if (isPaidUser) {
    return null;
  }

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      addToast('Please login to subscribe', 'info');
      navigate('/login');
      return;
    }

    setIsLoading(true);
    try {
      const { url } = await stripeService.createCheckoutSession();
      if (url) {
        window.location.href = url;
      } else {
        addToast('Failed to start checkout session', 'error');
      }
    } catch (error) {
      console.error('Error starting checkout:', error);
      addToast('Something went wrong. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    'Unlimited blog posts',
    'AI-powered writing assistance',
    'Advanced analytics',
    'Custom domain support',
    'Priority support',
    'Ad-free experience',
    'Early access to new features',
    'Exclusive community access'
  ];

  return (
    <section className="subscribe-section">
      <div className="container">
        <div className="subscribe-banner glass">
          {/* Left: Info */}
          <div className="banner-info">
            <div className="banner-header">
              <div className="banner-badge">
                <FiStar /> <span>Premium</span>
              </div>
              <h2 className="banner-title">
                Unlock Full <span className="gradient-text">Potential</span>
              </h2>
            </div>
            <p className="banner-subtitle">
              Get AI writing assistance, advanced analytics, and unlimited access.
            </p>
          </div>

          {/* Middle: Key Features Pills */}
          <div className="banner-features">
            <div className="feature-pill">
              <FiZap /> <span>AI Powered</span>
            </div>
            <div className="feature-pill">
              <FiCheck /> <span>Analytics</span>
            </div>
            <div className="feature-pill">
              <FiCheck /> <span>Unlimited</span>
            </div>
          </div>

          {/* Right: Action */}
          <div className="banner-action">
            <div className="banner-price">
              <span className="price-currency">₹</span>
              <span className="price-amount">10</span>
              <span className="price-period">/month</span>
            </div>
            <button 
              className="btn btn-primary btn-sm" 
              onClick={handleSubscribe}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
