import { Link } from 'react-router-dom';
import { FiXCircle, FiArrowLeft } from 'react-icons/fi';
import './PaymentResult.css';

const CancelPage = () => {
  return (
    <div className="payment-result-page">
      <div className="result-card glass">
        <div className="result-icon error">
          <FiXCircle />
        </div>
        <h1 className="result-title">Payment Cancelled</h1>
        <p className="result-message">
          Your payment process was cancelled. No charges were made.
          If you encountered an issue, please try again or contact support.
        </p>
        <div className="result-actions">
          <Link to="/" className="btn btn-outline">
            <FiArrowLeft /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
