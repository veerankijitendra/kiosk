// ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '../../utils/auth';
import { ROUTES } from '../../utils/routeConstants';

const ProtectedRoute = () => {
  return getAccessToken() ? <Outlet /> : <Navigate to={ROUTES.HOME} replace />;
};

const PublicRoute = () => {
  return !getAccessToken() ? <Outlet /> : <Navigate to={'/' + ROUTES.WELCOME} replace />;
};

export { ProtectedRoute, PublicRoute };
