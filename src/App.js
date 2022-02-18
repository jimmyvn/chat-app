import React from "react"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import './App.css'
import ChatRoom from "./components/ChatRoom"
import Login from './components/Login'
import AuthProvider from "./context/AuthProvider"

function App() {
  return <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route element={<Login />} path='/login' />
        <Route element={<ChatRoom />} path='/' />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
}

export default App
