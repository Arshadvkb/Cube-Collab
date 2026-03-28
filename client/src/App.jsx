import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login_Page from './pages/Login_Page'
import Register_Page from './pages/Register_Page'
import Home_Page from './pages/Home_Page'
import Dashboard from './pages/Dashboard'
import Profile_Page from './pages/Profile_Page'
import Document_Editor from './pages/Document_Editor'
import Document_View from './pages/Document_View'
import ForgotPassword from './pages/ForgotPassword'
import Settings_Page from './pages/Settings_Page'
import { useEffect } from 'react'
import socket from './lib/socket_client'

export const App = () => {
    useEffect(()=> {
    // Connect to the server
    socket.connect();


    socket.on("connect", () => {
      console.log("✅ Connected to Socket.io:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("❌ Connection Error:", err.message);
    });

    // Cleanup on unmount
    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, []);
  return (
    <div>
    
     <Routes>
      <Route element={<Login_Page/>} path='/login' />
      <Route element={<Register_Page/>} path='/register' />
      <Route element={<Home_Page/>} path='/' />
      <Route element={<Dashboard/>} path='/dashboard'/>
      <Route element={<Profile_Page/>} path='/profile'/>
      <Route element={<Document_Editor/>} path='/document/new'/>
      <Route element={<Document_Editor/>} path='/document/edit/:id'/>
      <Route element={<Document_View/>} path='/document/view/:id'/>
      <Route element={<ForgotPassword/>} path='/forgot-password'/>
      <Route element={<Settings_Page/>} path='/settings'/>
     </Routes>

    </div>
  )
}
