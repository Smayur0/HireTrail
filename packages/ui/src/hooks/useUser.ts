import React from "react";

const useUser = () => {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [roles, setRoles] = React.useState([]);
  const [primaryRole, setPrimaryRole] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const logout = () => {
    setUser(null);
    setToken(null);
    setRoles([]);
    setPrimaryRole(null);
    setIsAuthenticated(false);
  };

  const getToken = () => token;

  const hasRole = (role: string) => roles;

  return {
    user,
    token,
    roles,
    primaryRole,
    isLoading,
    error,
    isAuthenticated,
    logout,
    getToken,
    hasRole,
  };
};

export default useUser;
