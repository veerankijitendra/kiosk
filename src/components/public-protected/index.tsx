// ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../utils/routeConstants';
import { useAuthStore } from '../../store/useAuthStore';

const ProtectedRoute = () => {
  const { token } = useAuthStore.getState();
  return token ? <Outlet /> : <Navigate to={ROUTES.HOME} replace />;
};

const PublicRoute = () => {
  const { token } = useAuthStore.getState();
  return !token ? <Outlet /> : <Navigate to={'/' + ROUTES.WELCOME} replace />;
};

export { ProtectedRoute, PublicRoute };
