import React, { useEffect } from 'react';
import { usePopup } from '../../../utils/PopupContext';
import './Popup.css';

const Popup = () => {
  const { isVisible, popupTitle, popupContent, closePopup } = usePopup();

  useEffect(() => {
    let timer;

    if (isVisible) {
      timer = setTimeout(() => {
        closePopup();
      }, 4000);
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [isVisible]);

  return (
    <div className={`popup ${isVisible ? 'popup-visible' : ''}`}>
      <div className="popup-header">
        <h2>{popupTitle}</h2>
      </div>
      <div className="popup-content">
        {popupContent}
      </div>
    </div>
  );
};

export default Popup;
