import {
  createContext,
  useEffect,
  useState
}
from 'react'

import {
  onAuthStateChanged
}
from 'firebase/auth'

import {
  auth
}
from '../firebase/firebase'



export const AuthContext =
createContext()



function AuthProvider({
  children
}) {



  /* ================= STATES ================= */

  const [user,setUser] =
  useState(null)

  const [loading,setLoading] =
  useState(true)



  /* ================= AUTH OBSERVER ================= */

  useEffect(() => {

    const unsubscribe =
    onAuthStateChanged(

      auth,

      (currentUser) => {

        setUser(currentUser)

        setLoading(false)
      }
    )



    return () =>
    unsubscribe()

  },[])



  /* ================= PROVIDER ================= */

  return (

    <AuthContext.Provider

      value={{

        user,
        setUser,

        loading
      }}
    >

      {children}

    </AuthContext.Provider>
  )
}

export default AuthProvider