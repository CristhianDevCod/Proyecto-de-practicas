import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AuthContext } from '../Auth/Auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          (window.location.href = '/')
        )
      }
    />
  );
};

export default ProtectedRoute;
