import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'

import './styles/globals.css'
import './styles/auth.css'
import './styles/dashboard.css'
import './styles/dashboardLayout.css'
import './styles/focus.css'

ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <React.StrictMode>

    <App />

  </React.StrictMode>
)