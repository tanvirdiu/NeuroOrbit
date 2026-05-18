import logo from '../assets/logo.png'

import {
  useState,
  useContext,
  useEffect
}
from 'react'

import {
  Outlet,
  NavLink,
  useNavigate
}
from 'react-router-dom'

import {
  signOut
}
from 'firebase/auth'

import {
  auth
}
from '../firebase/firebase'

import {
  AuthContext
}
from '../context/AuthContext'

import {
  ThemeContext
}
from '../context/ThemeContext'

import {

  FaBars,
  FaTimes,
  FaChartLine,
  FaClock,
  FaTasks,
  FaBrain,
  FaLightbulb,
  FaUserCircle,
  FaCog,
  FaMoon,
  FaSun

}
from 'react-icons/fa'

import '../styles/dashboardLayout.css'



function DashboardLayout() {



  /* ================= STATES ================= */

  const [sidebarOpen,setSidebarOpen] =
  useState(false)

  const [isDesktop,setIsDesktop] =
  useState(window.innerWidth >= 992)



  /* ================= CONTEXT ================= */

  const {
    user
  } = useContext(AuthContext)



  const {
    theme,
    toggleTheme
  } = useContext(ThemeContext)



  const navigate =
  useNavigate()



  /* ================= RESPONSIVE ================= */

  useEffect(() => {

    const handleResize = () => {

      setIsDesktop(
        window.innerWidth >= 992
      )



      if(window.innerWidth >= 992){

        setSidebarOpen(false)
      }
    }



    handleResize()



    window.addEventListener(
      'resize',
      handleResize
    )



    return () =>

      window.removeEventListener(
        'resize',
        handleResize
      )

  },[])



  /* ================= LOGOUT ================= */

  const handleLogout =
  async () => {

    try{

      await signOut(auth)

      navigate('/')
    }

    catch(error){

      console.log(error.message)
    }
  }



  /* ================= CLOSE SIDEBAR ================= */

  const closeSidebar = () => {

    if(!isDesktop){

      setSidebarOpen(false)
    }
  }



  return (

    <div className={`layout ${theme}`}>



      {/* ================= MOBILE MENU ================= */}

      {
        !isDesktop && (

          <button
            className="menu-btn"

            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }

            aria-label="Menu"
          >

            {
              sidebarOpen

              ?

              <FaTimes />

              :

              <FaBars />
            }

          </button>
        )
      }



      {/* ================= SIDEBAR ================= */}

      <aside
        className={

          isDesktop

          ?

          'layout-sidebar desktop'

          :

          sidebarOpen

          ?

          'layout-sidebar active'

          :

          'layout-sidebar'
        }
      >



        {/* ================= TOP ================= */}

        <div className="sidebar-top">



          {/* ================= LOGO ================= */}

          <img
            src={logo}
            alt="NeuroOrbit"
            className="sidebar-logo"
          />



          {/* ================= LINKS ================= */}

          <div className="sidebar-links">



            {/* ===== DASHBOARD ===== */}

            <NavLink
              to="/dashboard"

              onClick={closeSidebar}

              className={({isActive}) =>

                isActive

                ?

                'sidebar-link active'

                :

                'sidebar-link'
              }
            >

              <FaChartLine />

              <span>

                Dashboard

              </span>

            </NavLink>



            {/* ===== FOCUS ===== */}

            <NavLink
              to="/focus"

              onClick={closeSidebar}

              className={({isActive}) =>

                isActive

                ?

                'sidebar-link active'

                :

                'sidebar-link'
              }
            >

              <FaClock />

              <span>

                Focus Mode

              </span>

            </NavLink>



            {/* ===== ASSIGNMENTS ===== */}

            <NavLink
              to="/assignments"

              onClick={closeSidebar}

              className={({isActive}) =>

                isActive

                ?

                'sidebar-link active'

                :

                'sidebar-link'
              }
            >

              <FaTasks />

              <span>

                Assignments

              </span>

            </NavLink>



            {/* ===== ANALYSIS ===== */}

            <NavLink
              to="/analysis"

              onClick={closeSidebar}

              className={({isActive}) =>

                isActive

                ?

                'sidebar-link active'

                :

                'sidebar-link'
              }
            >

              <FaBrain />

              <span>

                Analysis

              </span>

            </NavLink>



            {/* ===== INSIGHTS ===== */}

            <NavLink
              to="/insights"

              onClick={closeSidebar}

              className={({isActive}) =>

                isActive

                ?

                'sidebar-link active'

                :

                'sidebar-link'
              }
            >

              <FaLightbulb />

              <span>

                Insights

              </span>

            </NavLink>



            {/* ===== PROFILE ===== */}

            <NavLink
              to="/profile"

              onClick={closeSidebar}

              className={({isActive}) =>

                isActive

                ?

                'sidebar-link active'

                :

                'sidebar-link'
              }
            >

              <FaUserCircle />

              <span>

                Profile

              </span>

            </NavLink>



            {/* ===== SETTINGS ===== */}

            <NavLink
              to="/settings"

              onClick={closeSidebar}

              className={({isActive}) =>

                isActive

                ?

                'sidebar-link active'

                :

                'sidebar-link'
              }
            >

              <FaCog />

              <span>

                Settings

              </span>

            </NavLink>

          </div>

        </div>



        {/* ================= BOTTOM ================= */}

        <div className="sidebar-bottom">


          <button
            className="logout-btn"

            onClick={handleLogout}
          >

            Logout

          </button>

        </div>

      </aside>



      {/* ================= MAIN ================= */}

      <main className="layout-main">



        {/* ================= TOPBAR ================= */}

        <div className="layout-topbar">


          <div className="layout-user">



            {/* ===== THEME BUTTON ===== */}

            <button
              className="top-theme-btn"

              onClick={toggleTheme}

              aria-label="Toggle Theme"
            >

              {
                theme === 'dark'

                ?

                <FaSun />

                :

                <FaMoon />
              }

            </button>



            {/* ===== USER AVATAR ===== */}

            <div className="user-avatar">


              {

                user?.profile?.photo

                ||

                user?.firebaseUser?.photoURL

                ?

                <img

                  src={

                    user?.profile?.photo

                    ||

                    user?.firebaseUser?.photoURL
                  }

                  alt="User"

                  className="topbar-user-image"
                />

                :

                <span>

                  {

                    user?.profile?.name
                    ?.charAt(0)
                    ?.toUpperCase()

                    ||

                    user?.firebaseUser?.displayName
                    ?.charAt(0)
                    ?.toUpperCase()

                    ||

                    user?.profile?.email
                    ?.charAt(0)
                    ?.toUpperCase()

                    ||

                    'U'
                  }

                </span>
              }

            </div>

          </div>

        </div>



        {/* ================= PAGE CONTENT ================= */}

        <Outlet />

      </main>

    </div>
  )
}

export default DashboardLayout