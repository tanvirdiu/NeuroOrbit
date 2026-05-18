import {
  useContext
}
from 'react'

import {
  Navigate
}
from 'react-router-dom'

import {
  AuthContext
}
from '../context/AuthContext'



function ProtectedRoute({
  children
}) {



  const {
    user,
    loading
  }
  =
  useContext(AuthContext)



  /* ================= LOADING SCREEN ================= */

  if(loading){

    return(

      <div className="auth-loader">



        <div className="auth-spinner"></div>



        <h2>

          Loading NeuroOrbit...

        </h2>

      </div>
    )
  }



  /* ================= NO USER ================= */

  if(!user){

    return <Navigate to="/login" replace />
  }



  /* ================= ACCESS ================= */

  return children
}

export default ProtectedRoute