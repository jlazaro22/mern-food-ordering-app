import ProtectedRoute from '@/auth/ProtectedRoute';
import Layout from '@/layouts/Layout';
import AuthCallbackPage from '@/pages/AuthCallbackPage';
import HomePage from '@/pages/HomePage';
import ManageRestaurantPage from '@/pages/MAnageRestaurantPage';
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
        <Route
          path='/manage-restaurant'
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />
      </Route>

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}
