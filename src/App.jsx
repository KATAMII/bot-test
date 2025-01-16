import { useState } from 'react'
import './App.css'
import ChatBot from './components/ChatBot'

function App() {
  return (
    <div className="App">
      <h1>Welcome to Larkit Technology</h1>
      <p>Your trusted partner in technology solutions</p>
      <ChatBot />
    </div>
  )
}

export default App
