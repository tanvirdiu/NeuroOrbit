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
  } = useContext(AuthContext)



  /* ================= LOADING ================= */

  if(loading){

    return(

      <div
        style={{

          minHeight:'100vh',

          display:'flex',

          justifyContent:'center',

          alignItems:'center',

          background:'#0b1120',

          color:'white',

          fontSize:'24px',

          fontWeight:'700'
        }}
      >

        Loading...

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