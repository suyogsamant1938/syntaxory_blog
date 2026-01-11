import { createContext, useContext, useState, useCallback } from 'react';

const ConfirmContext = createContext();

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context.confirm;
};

export const ConfirmProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    type: 'danger', // danger, info, warning
    resolve: null,
  });

  const confirm = useCallback((options) => {
    const config = typeof options === 'string' 
        ? { message: options } 
        : options;

    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        title: config.title || 'Are you sure?',
        message: config.message || 'This action cannot be undone.',
        confirmText: config.confirmText || 'Confirm',
        cancelText: config.cancelText || 'Cancel',
        type: config.type || 'danger',
        resolve,
      });
    });
  }, []);

  const handleConfirm = () => {
    modalState.resolve(true);
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleCancel = () => {
    modalState.resolve(false);
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <ConfirmModal 
        {...modalState} 
        onConfirm={handleConfirm} 
        onCancel={handleCancel} 
      />
    </ConfirmContext.Provider>
  );
};

// Internal ConfirmModal component to keep things encapsulated
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, title, message, confirmText, cancelText, type, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-container glass">
        <div className="confirm-modal-header">
          <h3 className={`confirm-modal-title title-${type}`}>{title}</h3>
        </div>
        <div className="confirm-modal-body">
          <p>{message}</p>
        </div>
        <div className="confirm-modal-footer">
          <button className="confirm-btn-cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button className={`confirm-btn-confirm btn-${type}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
