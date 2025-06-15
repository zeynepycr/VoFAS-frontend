import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      validateToken();
    } else {
      setLoading(false);
    }
  }, [token]);

  const validateToken = async () => {
    try {
      const response = await fetch('/vofas/api/v1/my-account', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const responseData = await response.json();
        const userData = responseData.content;
        if (userData) {
          if (userData.role) userData.roleEnum = userData.role;
          if (userData.first_name) userData.firstName = userData.first_name;
          if (userData.last_name) userData.lastName = userData.last_name;
        }
        setUser(userData);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Token validation error:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('/vofas/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.json();
      const token = result.content?.jwtToken;

      if (!token) {
        throw new Error('No token received');
      }

      localStorage.setItem('token', token);
      setToken(token);

      const userResponse = await fetch('/vofas/api/v1/my-account', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user info');
      }

      const userResult = await userResponse.json();
      const userData = userResult.content;

      if (userData) {
        if (userData.role) userData.roleEnum = userData.role;
        if (userData.first_name) userData.firstName = userData.first_name;
        if (userData.last_name) userData.lastName = userData.last_name;
      }

      setUser(userData);

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isAdmin = () => {
    return user?.roleEnum === 'ADMIN';
  };

  const isCompanyRepresentative = () => {
    return user?.roleEnum === 'COMPANY_REPRESENTATIVE';
  };

  const getUserRole = () => {
    return user?.roleEnum;
  };

  const getUserFullName = () => {
    return user ? `${user.firstName} ${user.lastName}` : '';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      isAdmin, 
      isCompanyRepresentative,
      getUserRole,
      getUserFullName
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