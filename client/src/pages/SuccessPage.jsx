import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiCheckCircle, FiHome, FiLoader, FiAlertTriangle } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';
import './PaymentResult.css';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { refreshProfile, isPaidUser } = useAuth();
  const [verifying, setVerifying] = useState(!!sessionId);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verify = async () => {
      if (!sessionId) return;
      
      try {
        setVerifying(true);
        // Call server to verify session and update DB
        await authService.verifyStripeSession(sessionId);
        // Refresh local profile state
        await refreshProfile();
      } catch (err) {
        console.error('Verification error:', err);
        setError('We couldn\'t verify your payment immediately, but don\'t worry! It might take a few minutes for your account to update.');
      } finally {
        setVerifying(false);
      }
    };

    verify();
  }, [sessionId, refreshProfile]);

  return (
    <div className="payment-result-page">
      <div className="result-card glass">
        {verifying ? (
          <div className="result-status-loading">
            <div className="result-icon spinning">
              <FiLoader />
            </div>
            <h1 className="result-title">Verifying Payment...</h1>
            <p className="result-message">
              Please wait while we confirm your subscription and upgrade your account.
            </p>
          </div>
        ) : error ? (
          <div className="result-status-error">
            <div className="result-icon error">
              <FiAlertTriangle />
            </div>
            <h1 className="result-title">Almost There!</h1>
            <p className="result-message">{error}</p>
            <div className="result-actions">
              <Link to="/" className="btn btn-primary">
                <FiHome /> Go to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="result-status-success">
            <div className="result-icon success">
              <FiCheckCircle />
            </div>
            <h1 className="result-title">Payment Successful!</h1>
            <p className="result-message">
              Thank you for subscribing to Syntaxory Pro. Your account has been upgraded.
              {isPaidUser ? " You now have access to all premium features." : " Your account is being updated."}
            </p>
            <div className="result-actions">
              <Link to="/" className="btn btn-primary">
                <FiHome /> Go to Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
