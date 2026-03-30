import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('../pages/login/Login'));

const Router = () => {
  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <Routes>
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
