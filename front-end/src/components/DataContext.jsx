// DataContext.js
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [aggregatedData, setAggregatedData] = useState({
    highRiskAllergies: [],
    lowRiskAllergies: [],
    dietaryRestrictions: [],
  });

  return (
    <DataContext.Provider value={{ aggregatedData, setAggregatedData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);