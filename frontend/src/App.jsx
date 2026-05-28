import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NotificationPage from './pages/NotificationPage'
import OnboardingPage from './pages/OnboardingPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios'
import PageLoader from './components/PageLoader'
import useAuthUser from './hook/useAuthUser'
import Layout from './components/Layout'
import { useThemeStore } from './store/useThemeStore'

const App = () => {
  //todo: understand the useQuery and how it works with react-query and axios
  const { isLoading, authUser } = useAuthUser()
  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded
  const { theme } = useThemeStore()

  if (isLoading) {
    return <PageLoader />
  }


  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? <Layout showSidebar={true}><HomePage /> </Layout> : (
          <Navigate to={isAuthenticated ? "/onboarding" : "/login"} />
        )} />
        <Route path="/login" element={isAuthenticated ? (isOnboarded ? <Navigate to="/" /> : <Navigate to="/onboarding" />) : (<LoginPage />)} />
        <Route path="/signup" element={isAuthenticated ? (isOnboarded ? <Navigate to="/" /> : <Navigate to="/onboarding" />) : (<SignupPage />)} />
        <Route path="/notifications" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <NotificationPage />
          </Layout>
        ) : (<Navigate to={isAuthenticated ? "/onboarding" : "/login"} />)} />
        <Route path="/onboarding" element={
          isAuthenticated ? (isOnboarded ? (<Navigate to="/" />) : (
            <OnboardingPage />))
            : (
              <Navigate to="/login" />)
        } />
        <Route path="/call" element={authUser ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
