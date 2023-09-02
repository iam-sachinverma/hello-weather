import React, { createContext, useContext, useRef } from "react";

export const RefContext = createContext();

export const useRefs = () => {
  return useContext(RefContext);
};

export const RefProvider = ({ children }) => {
  const dynamicDataRef = useRef([]);
  const searchBoxInputRef = useRef(null);

  return (
    <RefContext.Provider value={{ dynamicDataRef, searchBoxInputRef }}>
      {children}
    </RefContext.Provider>
  );
};
