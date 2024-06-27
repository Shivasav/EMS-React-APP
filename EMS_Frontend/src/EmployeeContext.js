import React, { createContext, useContext, useState } from 'react';

// Create context
const EmployeeContext = createContext();

// Custom hook to consume context
export const useEmployeeContext = () => useContext(EmployeeContext);

// Provider component
export const EmployeeProvider = ({ children }) => {
  const [employeeList, setEmployeeList] = useState([]);

  return (
    <EmployeeContext.Provider value={[employeeList, setEmployeeList]}>
      {children}
    </EmployeeContext.Provider>
  );
};
