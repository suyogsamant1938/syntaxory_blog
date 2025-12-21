import { useEffect } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import './Toast.css';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type} animate-slideInRight`}>
          <div className="toast-icon">
            {toast.type === 'success' && <FiCheckCircle />}
            {toast.type === 'error' && <FiAlertCircle />}
            {toast.type === 'info' && <FiInfo />}
          </div>
          <p className="toast-message">{toast.message}</p>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>
            <FiX />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
