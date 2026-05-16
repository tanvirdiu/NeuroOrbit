import logo from '../assets/logo.png'

import {
  useState,
  useEffect
} from 'react'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from 'firebase/auth'

import {
  FcGoogle
} from 'react-icons/fc'

import {
  auth
} from '../firebase/firebase'



function Register() {


  /* =========================
     NAVIGATE
  ========================= */

  const navigate =
  useNavigate()



  /* =========================
     PROVIDER
  ========================= */

  const provider =
  new GoogleAuthProvider()



  /* =========================
     STATES
  ========================= */

  const [email,setEmail] =
  useState('')

  const [password,setPassword] =
  useState('')

  const [error,setError] =
  useState('')

  const [loading,setLoading] =
  useState(false)

  const [googleLoading,setGoogleLoading] =
  useState(false)



  /* =========================
     AUTO LOGIN CHECK
  ========================= */

  useEffect(()=>{

    const unsubscribe =

    onAuthStateChanged(

      auth,

      (user)=>{

        if(user){

          navigate('/dashboard')
        }
      }
    )

    return ()=>unsubscribe()

  },[])



  /* =========================
     EMAIL REGISTER
  ========================= */

  const handleRegister =
  async(e)=>{

    e.preventDefault()

    setError('')



    if(password.length < 6){

      setError(
        'Password must be at least 6 characters'
      )

      return
    }



    setLoading(true)

    try{

      await createUserWithEmailAndPassword(

        auth,

        email.trim(),

        password
      )

      navigate('/dashboard')
    }

    catch(err){

      console.log(err.message)



      if(
        err.code ===
        'auth/email-already-in-use'
      ){

        setError(
          'Email already exists'
        )
      }



      else if(
        err.code ===
        'auth/invalid-email'
      ){

        setError(
          'Invalid email address'
        )
      }



      else if(
        err.code ===
        'auth/network-request-failed'
      ){

        setError(
          'Network error. Check internet connection.'
        )
      }



      else{

        setError(
          'Failed to create account'
        )
      }
    }

    finally{

      setLoading(false)
    }
  }



  /* =========================
     GOOGLE LOGIN
  ========================= */

  const handleGoogleLogin =
  async()=>{

    setGoogleLoading(true)

    try{

      await signInWithPopup(
        auth,
        provider
      )

      navigate('/dashboard')
    }

    catch(err){

      console.log(err.message)

      setError(
        'Google sign in failed'
      )
    }

    finally{

      setGoogleLoading(false)
    }
  }



  /* =========================
     JSX
  ========================= */

  return (

    <div className="auth-page">


      <div className="auth-wrapper">


        {/* LEFT SIDE */}

        <div className="auth-left">


          <div className="auth-overlay" />


          <h1>

            Welcome

          </h1>



          {/* LOGO */}

          <div className="auth-illustration">


            <img
              src={logo}
              alt="NeuroOrbit"
              className="auth-logo"
            />


            <span className="auth-dot one"></span>

            <span className="auth-dot two"></span>

          </div>



          <p>

            Join NeuroOrbit today

          </p>

        </div>



        {/* RIGHT SIDE */}

        <div className="auth-right">


          <h2>

            REGISTER

          </h2>



          {/* FORM */}

          <form
            className="auth-form"
            onSubmit={handleRegister}
          >


            {/* EMAIL */}

            <input
              type="email"
              placeholder="Email"

              value={email}

              onChange={(e)=>
                setEmail(
                  e.target.value
                )
              }

              required
            />



            {/* PASSWORD */}

            <input
              type="password"
              placeholder="Password"

              value={password}

              onChange={(e)=>
                setPassword(
                  e.target.value
                )
              }

              required
            />



            {/* ERROR */}

            {
              error && (

                <p
                  style={{
                    color:'#ef4444',
                    fontSize:'.95rem',
                    marginTop:'-6px',
                    fontWeight:'500'
                  }}
                >

                  {error}

                </p>
              )
            }



            {/* REGISTER BUTTON */}

            <button
              className="auth-btn"
              type="submit"
              disabled={loading}
            >

              {
                loading

                ? 'Creating Account...'

                : 'Register'
              }

            </button>

          </form>



          {/* DIVIDER */}

          <div className="auth-divider">

            <span>

              OR

            </span>

          </div>



          {/* GOOGLE BUTTON */}

          <button
            className="google-auth-btn"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
          >

            <FcGoogle />

            {
              googleLoading

              ? 'Connecting...'

              : 'Continue with Google'
            }

          </button>



          {/* FOOTER */}

          <div className="auth-footer">


            Already have an account?


            <Link to="/login">

              Login

            </Link>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Register