import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login_Page from './pages/Login_Page'
import Register_Page from './pages/Register_Page'
import Home_Page from './pages/Home_Page'

export const App = () => {
  return (
    <div>
     <Routes>
      <Route element={<Login_Page/>} path='/' />
      <Route element={<Register_Page/>} path='/register' />
      <Route element={<Home_Page/>} path='/home' />
     </Routes>

    </div>
  )
}
