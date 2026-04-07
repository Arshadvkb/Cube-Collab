import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

const Login_Page = React.lazy(() => import('./pages/Login_Page'));
const Register_Page = React.lazy(() => import('./pages/Register_Page'));
const Home_Page = React.lazy(() => import('./pages/Home_Page'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile_Page = React.lazy(() => import('./pages/Profile_Page'));
const Document_Editor = React.lazy(() => import('./pages/Document_Editor'));
const Document_View = React.lazy(() => import('./pages/Document_View'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const Settings_Page = React.lazy(() => import('./pages/Settings_Page'));
const Features_Page = React.lazy(() => import('./pages/Features_Page'));
const Pricing_Page = React.lazy(() => import('./pages/Pricing_Page'));
const Security_Page = React.lazy(() => import('./pages/Security_Page'));
const About_Page = React.lazy(() => import('./pages/About_Page'));
const Careers_Page = React.lazy(() => import('./pages/Careers_Page'));
const Contact_Page = React.lazy(() => import('./pages/Contact_Page'));
const Privacy_Page = React.lazy(() => import('./pages/Privacy_Page'));
const Terms_Page = React.lazy(() => import('./pages/Terms_Page'));
import socket from './lib/socket_client';

const SuspenseFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export const App = () => {
  useEffect(() => {
    // Connect to the server
    socket.connect();

    socket.on('connect', () => {
      console.log('✅ Connected to Socket.io:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.log('❌ Connection Error:', err.message);
    });

    // Cleanup on unmount
    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          <Route element={<Login_Page />} path="/login" />
          <Route element={<Register_Page />} path="/register" />
          <Route element={<Home_Page />} path="/" />
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Profile_Page />} path="/profile" />
          <Route element={<Document_Editor />} path="/document/new" />
          <Route element={<Document_Editor />} path="/document/edit/:id" />
          <Route element={<Document_View />} path="/document/view/:id" />
          <Route element={<ForgotPassword />} path="/forgot-password" />
          <Route element={<Settings_Page />} path="/settings" />
          <Route element={<Features_Page />} path="/features" />
          <Route element={<Pricing_Page />} path="/pricing" />
          <Route element={<Security_Page />} path="/security" />
          <Route element={<About_Page />} path="/about" />
          <Route element={<Careers_Page />} path="/careers" />
          <Route element={<Contact_Page />} path="/contact" />
          <Route element={<Privacy_Page />} path="/privacy" />
          <Route element={<Terms_Page />} path="/terms" />
        </Routes>
      </Suspense>
    </div>
  );
};
