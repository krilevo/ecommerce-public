import React, { createContext, useContext, useState } from 'react';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState(null);
  const [popupContent, setPopupContent] = useState(null);

  const closePopup = () => {
    setIsVisible(false);
  };

  const openPopup = (title, content) => {
    setPopupTitle(title);
    setPopupContent(content);
    setIsVisible(true);
  };

  return (
    <PopupContext.Provider value={{ isVisible, openPopup, closePopup, popupTitle, popupContent }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  return useContext(PopupContext);
};
