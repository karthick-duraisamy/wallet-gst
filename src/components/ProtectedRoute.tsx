import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { loginSuccess } from '../store/slices/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Check for existing session if not authenticated
    if (!isAuthenticated) {
      const savedSession = localStorage.getItem('gst_user_session');
      if (savedSession) {
        try {
          const { user } = JSON.parse(savedSession);
          dispatch(loginSuccess(user));
        } catch (error) {
          localStorage.removeItem('gst_user_session');
        }
      }
    }
    setIsLoading(false);
  }, [isAuthenticated, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;