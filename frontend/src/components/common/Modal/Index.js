import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, action, onAction, onClose, title, message }) => {

  // Close the modal when the user clicks outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.modal')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-background">
      <div className="modal">
        <h3 className="modal-title">{title}</h3>
        <div className="modal-body">{message}</div>
        <div className="modal-buttons">
          <button className="modal-action-btn" onClick={onAction}>{action}</button>
          <button className="modal-close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;