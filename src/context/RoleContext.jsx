import { createContext, useContext, useState } from 'react';
import { ROLES } from '../constants/constants';

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [role, setRole] = useState(() => {
    return localStorage.getItem('fd_role') || ROLES.ADMIN;
  });

  const changeRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem('fd_role', newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole: changeRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be inside RoleProvider');
  return ctx;
};