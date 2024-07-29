import React, { useContext, useEffect } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import LoginForm from './login/components/login-page';
import ForgotPassword from './reset-password/component/forgot-password-screen';
import AdminView from './admin-view/components/admin-view-edit-screen';
import ManageUsers from './admin-view/sub-components/manage-users-table';
import LeaseEditPage from './admin-view/sub-components/lease-details-table';
import BLDEditPage from './admin-view/sub-components/building-edit-table';
import ActEditPage from './admin-view/sub-components/activity-edit-table';
import { SessionStateContext, SessionContextValue } from './sessionContext';
import SessionProvider from './sessionProvider';

const App: React.FC = () => {
  return (
    // after reset
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={
            <RequireAuth roles={['Admin']}>
              <AdminView />
            </RequireAuth>
          } />
          <Route path="/users-table" element={
            <RequireAuth roles={['Admin']}>
              <ManageUsers />
            </RequireAuth>
          } />
          <Route path="/lease-edit-table" element={
            <RequireAuth roles={['Admin']}>
              <LeaseEditPage />
            </RequireAuth>
          } />
          <Route path="/bld-edit-table" element={
            <RequireAuth roles={['Admin']}>
              <BLDEditPage />
            </RequireAuth>
          } />
          <Route path="/act-edit-table" element={
            <RequireAuth roles={['Admin']}>
              <ActEditPage />
            </RequireAuth>
          } />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  );
};


interface RequireAuthProps {
  children: React.ReactNode;
  roles?: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, roles }) => {
  const { session, deleteSession } = useContext(SessionStateContext) as SessionContextValue;

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      if (session) {
        deleteSession();
      }
    });
  }, [deleteSession, session]);

  if (!session) {
    return <Navigate to="/" replace />;
  }

  // You can use the additional props to perform additional checks
  if (roles && !roles.includes(session.type)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
export default App;
