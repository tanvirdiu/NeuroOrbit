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
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'

import {
  auth
} from '../firebase/firebase'



function Login() {


  /* =========================
     NAVIGATE
  ========================= */

  const navigate =
  useNavigate()



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
     LOGIN
  ========================= */

  const handleLogin =
  async(e)=>{

    e.preventDefault()

    setError('')

    setLoading(true)

    try{

      await signInWithEmailAndPassword(

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
        'auth/invalid-credential'
      ){

        setError(
          'Invalid email or password'
        )
      }



      else if(
        err.code ===
        'auth/too-many-requests'
      ){

        setError(
          'Too many attempts. Try again later.'
        )
      }



      else if(
        err.code ===
        'auth/network-request-failed'
      ){

        setError(
          'Network error. Check your internet.'
        )
      }



      else{

        setError(
          'Login failed'
        )
      }
    }

    finally{

      setLoading(false)
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

            NeuroOrbit Productivity System

          </p>

        </div>



        {/* RIGHT SIDE */}

        <div className="auth-right">


          <h2>

            LOGIN

          </h2>



          <form
            className="auth-form"
            onSubmit={handleLogin}
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



            {/* BUTTON */}

            <button
              className="auth-btn"
              type="submit"
              disabled={loading}
            >

              {
                loading

                ? 'Signing In...'

                : 'Login'
              }

            </button>

          </form>



          {/* FOOTER */}

          <div className="auth-footer">


            Don’t have an account?


            <Link to="/register">

              Register

            </Link>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login