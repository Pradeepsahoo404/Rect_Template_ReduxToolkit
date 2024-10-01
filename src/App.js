import React, { lazy, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change'
import checkAuth from './app/auth';
import initializeApp from './app/init';
import { useSelector } from 'react-redux';

// Importing pages
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const VerifyForgetPassword = lazy(()=> import('./features/user/VerifyForgetPassword'))
const Register = lazy(() => import('./pages/Register'))
const Documentation = lazy(() => import('./pages/Documentation'))


// Initializing different libraries
initializeApp()


function App() {

  const {userToken} = useSelector(state => state.auth)

  // console.log(userToken , "userToken")

  const token = localStorage.getItem('userToken');

  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false)
  }, [])


  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<VerifyForgetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/documentation" element={<Documentation />} />
          
          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />

          <Route path="*" element={<Navigate to={userToken ? "/app/dashboard" : "/login"} replace />}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
