import {
  createBrowserRouter,
  Navigate
}
from 'react-router-dom'

import Login
from './pages/Login'

import Register
from './pages/Register'

import Dashboard
from './pages/Dashboard'

import Focus
from './pages/Focus'

import Assignments
from './pages/Assignments'

import Analysis
from './pages/Analysis'

import Insights
from './pages/Insights'

import Profile
from './pages/Profile'

import Settings
from './pages/Settings'

import ProtectedRoute
from './components/ProtectedRoute'

import DashboardLayout
from './layouts/DashboardLayout'



const router =
createBrowserRouter([



  /* ================= DEFAULT ================= */

  {

    path:'/',

    element:
    <Navigate
      to="/login"
      replace
    />
  },



  /* ================= AUTH ================= */

  {

    path:'/login',

    element:<Login />
  },

  {

    path:'/register',

    element:<Register />
  },



  /* ================= PROTECTED ROUTES ================= */

  {

    path:'/',

    element:

    <ProtectedRoute>

      <DashboardLayout />

    </ProtectedRoute>,


    children:[



      /* ===== DASHBOARD ===== */

      {

        path:'dashboard',

        element:<Dashboard />
      },



      /* ===== FOCUS ===== */

      {

        path:'focus',

        element:<Focus />
      },



      /* ===== ASSIGNMENTS ===== */

      {

        path:'assignments',

        element:<Assignments />
      },



      /* ===== ANALYSIS ===== */

      {

        path:'analysis',

        element:<Analysis />
      },



      /* ===== INSIGHTS ===== */

      {

        path:'insights',

        element:<Insights />
      },



      /* ===== PROFILE ===== */

      {

        path:'profile',

        element:<Profile />
      },



      /* ===== SETTINGS ===== */

      {

        path:'settings',

        element:<Settings />
      }

    ]
  },



  /* ================= FALLBACK ================= */

  {

    path:'*',

    element:
    <Navigate
      to="/dashboard"
      replace
    />
  }

])

export default router