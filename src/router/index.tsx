import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import KioskWrapper from '../components/wrapper/KioskWrapper';
import { ROUTES } from '../utils/routeConstants';

const LoginPage = lazy(() => import('../pages/login/Login'));
const HomeWelcome = lazy(() => import('../pages/welcome/Welcome'));
const CheckInDetails = lazy(() => import('../pages/check-in-details/CheckInDetails'));
const Payment = lazy(() => import('../pages/payment/PaymentMethod'));
const Token = lazy(() => import('../pages/token/Token'));
const Department = lazy(() => import('../pages/departments/SelectDepartment'));

const Router = () => {
  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <Routes>
        <Route path={ROUTES.HOME} element={<KioskWrapper />}>
          <Route index element={<LoginPage />} />
          <Route path={ROUTES.WELCOME} element={<HomeWelcome />} />
          <Route path={ROUTES.CHECK_IN_DETAILS} element={<CheckInDetails />} />
          <Route path={ROUTES.PAYMENT} element={<Payment />} />
          <Route path={ROUTES.DEPARTMENTS} element={<Department />} />
          <Route path={ROUTES.DOCTORS} element={<Payment />} />
          <Route path={ROUTES.TOKEN} element={<Token />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
