
import {
  RouterProvider
} from 'react-router-dom'

import {
  useEffect,
  useState
} from 'react'

import {
  onAuthStateChanged
} from 'firebase/auth'

import {
  collection,
  onSnapshot,
  query
} from 'firebase/firestore'

import router from './routes'

import {
  ThemeProvider
} from './context/ThemeContext'

import AuthProvider
from './context/AuthContext'

import {
  auth,
  db
} from './firebase/firebase'



function App() {


  /* =========================
     STATES
  ========================= */

  const [firebaseUser,setFirebaseUser] =
  useState(null)

  const [assignments,setAssignments] =
  useState([])

  const [loading,setLoading] =
  useState(true)



  /* =========================
     AUTH LISTENER
  ========================= */

  useEffect(()=>{

    const unsubscribe =

    onAuthStateChanged(

      auth,

      (user)=>{

        setFirebaseUser(user)

        setLoading(false)
      }
    )

    return ()=>unsubscribe()

  },[])



  /* =========================
     REALTIME ASSIGNMENTS
  ========================= */

  useEffect(()=>{

    if(!firebaseUser) return

    const q = query(

      collection(
        db,
        'users',
        firebaseUser.uid,
        'assignments'
      )
    )



    const unsubscribe =

    onSnapshot(q,(snapshot)=>{

      const assignmentData =

      snapshot.docs.map(doc => ({

        id:doc.id,

        ...doc.data()
      }))



      setAssignments(
        assignmentData
      )
    })



    return ()=>unsubscribe()

  },[firebaseUser])



  /* =========================
     LOADING
  ========================= */

  if(loading){

    return (

      <div className="app-loader">

        <div className="loader-circle"></div>

        <h2>

          Loading NeuroOrbit...

        </h2>

      </div>
    )
  }



  /* =========================
     APP
  ========================= */

  return (

    <ThemeProvider>

      <AuthProvider

        value={{

          firebaseUser,

          assignments,

          setAssignments

        }}
      >

        <RouterProvider
          router={router}
        />

      </AuthProvider>

    </ThemeProvider>
  )
}

export default App