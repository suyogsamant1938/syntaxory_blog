import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  disabled = false,
  onClick,
  type = 'button',
  className = ''
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <span className="btn-spinner"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
