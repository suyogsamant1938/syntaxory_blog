import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'md' }) => {
  return (
    <div className={`spinner spinner-${size}`}>
      <div className="spinner-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
