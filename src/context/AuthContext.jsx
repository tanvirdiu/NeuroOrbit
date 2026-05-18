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

  doc,
  getDoc,
  setDoc

}
from 'firebase/firestore'

import {
  auth,
  db
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

      async (currentUser) => {

        try{



          /* ================= NO USER ================= */

          if(!currentUser){

            setUser(null)

            setLoading(false)

            return
          }



          /* ================= USER REF ================= */

          const userRef = doc(

            db,
            'users',
            currentUser.uid
          )



          const userSnap =
          await getDoc(userRef)



          /* ================= DEFAULT DATA ================= */

          const defaultData = {

            uid:
            currentUser.uid,

            name:
            currentUser.displayName
            || 'User',

            email:
            currentUser.email
            || '',

            photo:
            currentUser.photoURL
            || '',

            bio:
            'AI Powered Productivity Explorer',

            university:'',
            github:'',
            linkedin:'',
            location:''
          }



          /* ================= CREATE USER ================= */

          if(!userSnap.exists()){

            await setDoc(

              userRef,

              defaultData
            )



            setUser({

              firebaseUser:
              currentUser,

              profile:
              defaultData
            })
          }



          /* ================= EXISTING USER ================= */

          else{

            const profileData =
            userSnap.data()



            /* ================= FINAL FIX ================= */

            setUser({

              firebaseUser:
              currentUser,

              profile:
              {

                ...profileData,



                /* ===== FIRESTORE PHOTO PRIORITY ===== */

                photo:

                profileData.photo

                ?

                profileData.photo

                :

                currentUser.photoURL

                ||

                ''
              }
            })
          }

        }

        catch(error){

          console.log(error)
        }

        finally{

          setLoading(false)
        }
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