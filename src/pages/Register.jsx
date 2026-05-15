import logo from '../assets/logo.png'
import {
  useState
} from 'react'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'

import {
  FcGoogle
} from 'react-icons/fc'

import {
  auth
} from '../firebase/firebase'

function Register() {

  const navigate =
  useNavigate()

  const provider =
  new GoogleAuthProvider()

  const [email,setEmail] =
  useState('')

  const [password,setPassword] =
  useState('')

  const [error,setError] =
  useState('')


  /* EMAIL REGISTER */

  const handleRegister =
  async(e) => {

    e.preventDefault()

    setError('')

    try{

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      navigate('/dashboard')
    }

    catch(err){

      setError(
        'Failed to create account'
      )

      console.log(err.message)
    }
  }



  /* GOOGLE LOGIN */

  const handleGoogleLogin =
  async () => {

    try{

      await signInWithPopup(
        auth,
        provider
      )

      navigate('/dashboard')
    }

    catch(err){

      console.log(err.message)
    }
  }



  return (

    <div className="auth-page">


      <div className="auth-wrapper">


        {/* LEFT SIDE */}

        <div className="auth-left">

          <div className="auth-overlay" />

          <h1>

            Welcome

          </h1>


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


          <form
            className="auth-form"
            onSubmit={handleRegister}
          >


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


            {
              error && (

                <p
                  style={{
                    color:'#ef4444',
                    fontSize:'.95rem',
                    marginTop:'-6px'
                  }}
                >

                  {error}

                </p>
              )
            }


            <button
              className="auth-btn"
              type="submit"
            >

              Register

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
          >

            <FcGoogle />

            Continue with Google

          </button>



          <div className="auth-footer">

            Already have an account?

            <Link to="/">

              Login

            </Link>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Register