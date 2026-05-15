import logo from '../assets/logo.png'
import {
  useState
} from 'react'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import {
  signInWithEmailAndPassword
} from 'firebase/auth'

import {
  auth
} from '../firebase/firebase'

function Login() {

  const navigate =
  useNavigate()

  const [email,setEmail] =
  useState('')

  const [password,setPassword] =
  useState('')

  const [error,setError] =
  useState('')


  const handleLogin =
  async(e) => {

    e.preventDefault()

    setError('')

    try{

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      navigate('/dashboard')
    }

    catch(err){

      setError(
        'Invalid email or password'
      )

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

              Login

            </button>

          </form>



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