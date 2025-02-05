import { useContext } from 'react';
import { UserdataApiContext } from '../lib/contexts/UserdataApiContext';

export const useUserContext = () => {
  const context = useContext(UserdataApiContext);

  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};