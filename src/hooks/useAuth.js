import { useContext } from 'react';
// 1. Import the context from the context file
import { AuthContext } from '../contexts/AuthContext';

// 2. Create and export the hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // This error is helpful for developers, ensuring they use the hook correctly
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};