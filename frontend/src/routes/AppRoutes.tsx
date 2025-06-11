import Layout from '@/layouts/Layout';
import AuthCallbackPage from '@/pages/AuthCallbackPage';
import HomePage from '@/pages/HomePage';
import { Navigate, Route, Routes } from 'react-router';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route path='/auth-callback' element={<AuthCallbackPage />} />
      <Route
        path='/user-profile'
        element={
          <Layout>
            <h1>User Profile Page</h1>
          </Layout>
        }
      />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}
