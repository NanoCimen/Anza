import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const isLoadingAuth = false;
  const isLoadingPublicSettings = false;
  const authError = null;
  const appPublicSettings = null;
  const authChecked = true;
  const logout = () => {};
  const navigateToLogin = () => {};
  const checkUserAuth = async () => {};
  const checkAppState = async () => {};

  return (
    <AuthContext.Provider value={{
      user: null,
      isAuthenticated: true,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      logout,
      navigateToLogin,
      checkUserAuth,
      checkAppState,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
