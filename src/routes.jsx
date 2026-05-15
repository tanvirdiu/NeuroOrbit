import {
  createBrowserRouter,
  Navigate
} from 'react-router-dom'

import Login
from './pages/Login'

import Register
from './pages/Register'

import Dashboard
from './pages/Dashboard'

import Focus
from './pages/Focus'

import ProtectedRoute
from './components/ProtectedRoute'

import DashboardLayout
from './layouts/DashboardLayout'



const router =
createBrowserRouter([


  /* DEFAULT ROUTE */

  {
    path:'/',

    element:<Navigate to="/login" />
  },


  /* AUTH */

  {
    path:'/login',

    element:<Login />
  },

  {
    path:'/register',

    element:<Register />
  },



  /* DASHBOARD */

  {

    path:'/',

    element:

    <ProtectedRoute>

      <DashboardLayout />

    </ProtectedRoute>,


    children:[

      {

        path:'dashboard',

        element:<Dashboard />
      },

      {

        path:'focus',

        element:<Focus />
      }

    ]
  }

])

export default router