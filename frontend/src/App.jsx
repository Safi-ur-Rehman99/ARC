import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
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
 const {data, isLoading, error} = useQuery({ queryKey: ['todos'],
   queryFn: async () => {
    const res= await axiosInstance.get('/auth/me')
    return res.data
   },
   retry: false
   }) 
 
 return (
    <div>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/call" element={<CallPage />} />
          <Route path="/chat" element={<ChatPage />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
