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

const App = () => {
  //todo: understand the useQuery and how it works with react-query and axios
 const {data: authData, isLoading, error} = useQuery({ queryKey: ['todos'],
   queryFn: async () => {
    const res= await axiosInstance.get('/auth/me')
    return res.data
   },
   retry: false
   }) ;
 const authUser= authData?.user
 return (
    <div>
      <Routes>
          <Route path="/" element={ authUser? <HomePage />: <Navigate to="/login" /> } />
          <Route path="/login" element={!authUser?<LoginPage />: <Navigate to="/" /> } />
          <Route path="/signup" element={!authUser?<SignupPage />: <Navigate to="/" /> } />
          <Route path="/notification" element={authUser ? <NotificationPage /> : <Navigate to="/login" />  } />
          <Route path="/onboarding" element={authUser ? <OnboardingPage /> : <Navigate to="/login" /> } />
          <Route path="/call" element={authUser ? <CallPage /> : <Navigate to="/login" /> } />
          <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" /> } />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
