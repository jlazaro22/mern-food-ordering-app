import ProtectedRoute from '@/auth/ProtectedRoute';
import Layout from '@/layouts/Layout';
import AuthCallbackPage from '@/pages/AuthCallbackPage';
import HomePage from '@/pages/HomePage';
import UserProfilePage from '@/pages/UserProfilePage';
import { Navigate, Route, Routes } from 'react-router';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path='/auth-callback' element={<AuthCallbackPage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path='/user-profile'
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
      </Route>

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}
