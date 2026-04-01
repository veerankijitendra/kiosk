import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import KioskWrapper from '../components/wrapper/KioskWrapper';
import Animation from '../components/animation/Animation';
import { ROUTES } from '../utils/routeConstants';

// import Login from '../pages/login/Login';
// import HomeWelcome from '../pages/welcome/Welcome';
// import PaymentMethod from '../pages/payment/PaymentMethod';
// import SelectDepartment from '../pages/departments/SelectDepartment';
// import TokenGenerated from '../pages/token/Token';
// import PatientCheckin from '../pages/check-in-details/CheckInDetails';
import { Suspense, lazy } from 'react';
import SuspenceFallback from '../components/suspence/Suspence';
import SelectDoctor from '../pages/doctors/SelectDoctor';
import { NetworkListener } from '../components/network-status/NetworkListener';
import { NetworkStatusChip } from '../components/network-status/NetworkStatusChip';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const delayTime = 0;
const LoginPage = lazy(async () => {
  await delay(delayTime);
  return import('../pages/login/Login');
});
const HomeWelcome = lazy(async () => {
  await delay(delayTime);
  return import('../pages/welcome/Welcome');
});
const PatientCheckin = lazy(async () => {
  await delay(delayTime);
  return import('../pages/check-in-details/CheckInDetails');
});
const PaymentMethod = lazy(async () => {
  await delay(delayTime);
  return import('../pages/payment/PaymentMethod');
});
const TokenGenerated = lazy(async () => {
  await delay(delayTime);
  return import('../pages/token/Token');
});
const SelectDepartment = lazy(async () => {
  await delay(delayTime);
  return import('../pages/departments/SelectDepartment');
});

const Router = () => {
  const location = useLocation();
  const direction = location.state?.direction ?? 1;

  return (
    <KioskWrapper>
      <div style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
        <NetworkListener />
        <AnimatePresence mode='wait'>
          <Animation key={location.pathname} direction={direction}>
            <Suspense fallback={<SuspenceFallback />}>
              <NetworkStatusChip />
              <Routes location={location}>
                {/* <Route path={ROUTES.HOME} element={<KioskWrapper />}> */}
                <Route index element={<LoginPage />} />
                <Route path={ROUTES.WELCOME} element={<HomeWelcome />} />
                <Route path={ROUTES.DEPARTMENTS} element={<SelectDepartment />} />
                <Route path={ROUTES.DOCTORS} element={<SelectDoctor />} />
                <Route path={ROUTES.CHECK_IN_DETAILS} element={<PatientCheckin />} />
                <Route path={ROUTES.PAYMENT} element={<PaymentMethod />} />
                <Route path={ROUTES.TOKEN} element={<TokenGenerated />} />
                {/* </Route> */}
              </Routes>
            </Suspense>
          </Animation>
        </AnimatePresence>
      </div>
    </KioskWrapper>
  );
};

export default Router;
