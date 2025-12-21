import { Link } from 'react-router-dom';
import { FiCheckCircle, FiHome } from 'react-icons/fi';
import './PaymentResult.css';

const SuccessPage = () => {
  return (
    <div className="payment-result-page">
      <div className="result-card glass">
        <div className="result-icon success">
          <FiCheckCircle />
        </div>
        <h1 className="result-title">Payment Successful!</h1>
        <p className="result-message">
          Thank you for subscribing to Syntaxory Pro. Your account has been upgraded.
          You now have access to all premium features.
        </p>
        <div className="result-actions">
          <Link to="/" className="btn btn-primary">
            <FiHome /> Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
