import '../styles/Settings.css'

import {
  useContext,
  useEffect,
  useState
}
from 'react'

import {
  AuthContext
}
from '../context/AuthContext'

import {
  ThemeContext
}
from '../context/ThemeContext'

import {

  updateProfile,
  updatePassword,
  signOut

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

import {

  FaUserCog,
  FaPalette,
  FaBell,
  FaBrain,
  FaShieldAlt,
  FaSave,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaLock,
  FaClock,
  FaRobot,
  FaFire,
  FaCheckCircle

}
from 'react-icons/fa'

import {
  useNavigate
}
from 'react-router-dom'



function Settings() {



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



  /* ================= STATES ================= */

  const [activeTab,setActiveTab] =
  useState('account')

  const [loading,setLoading] =
  useState(true)

  const [saving,setSaving] =
  useState(false)

  const [success,setSuccess] =
  useState('')

  const [error,setError] =
  useState('')



  const [settings,setSettings] =
  useState({

    name:'',
    photo:'',

    focusDuration:50,
    breakDuration:10,

    notifications:true,
    streakAlerts:true,
    aiMode:true,
    deepFocus:true,

    accentColor:'purple',
    compactMode:false,

    newPassword:''
  })



  /* ================= FETCH SETTINGS ================= */

  useEffect(() => {

    const fetchSettings = async () => {

      try{

        if(!user){

          setLoading(false)

          return
        }



        const docRef = doc(

          db,
          'users',
          user.uid,
          'preferences',
          'settings'
        )



        const docSnap =
        await getDoc(docRef)



        if(docSnap.exists()){

          setSettings(prev => ({

            ...prev,

            ...docSnap.data()
          }))
        }

      }

      catch(error){

        console.log(error)
      }

      finally{

        setLoading(false)
      }
    }

    fetchSettings()

  },[user])



  /* ================= INPUT ================= */

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked
    } = e.target



    setSettings({

      ...settings,

      [name]:

      type === 'checkbox'

      ?

      checked

      :

      value
    })
  }



  /* ================= SAVE ================= */

  const handleSave = async () => {

    try{

      setSaving(true)

      setSuccess('')
      setError('')



      /* ===== FIRESTORE ===== */

      const settingsRef = doc(

        db,
        'users',
        user.uid,
        'preferences',
        'settings'
      )



      await setDoc(

        settingsRef,

        settings,

        {
          merge:true
        }
      )



      /* ===== AUTH PROFILE ===== */

      await updateProfile(

        user,

        {

          displayName:
          settings.name,

          photoURL:
          settings.photo
        }
      )



      /* ===== PASSWORD ===== */

      if(settings.newPassword){

        await updatePassword(

          user,

          settings.newPassword
        )
      }



      setSuccess(
        'Settings updated successfully'
      )

    }

    catch(error){

      console.log(error)

      setError(
        error.message
      )
    }

    finally{

      setSaving(false)

      setTimeout(() => {

        setSuccess('')
        setError('')

      },3000)
    }
  }



  /* ================= LOGOUT ================= */

  const handleLogout = async () => {

    try{

      await signOut(auth)

      navigate('/login')

    }

    catch(error){

      console.log(error)
    }
  }



  /* ================= LOADING ================= */

  if(loading){

    return(

      <div className="settings-loading">

        Loading Settings...

      </div>
    )
  }



  return (

    <div className={`settings-page ${theme}`}>



      {/* ================= SIDEBAR ================= */}

      <div className="settings-sidebar">


        <h2>

          NeuroOrbit

        </h2>



        <button
          className={
            activeTab === 'account'

            ?

            'settings-tab active'

            :

            'settings-tab'
          }

          onClick={() =>
          setActiveTab('account')}
        >

          <FaUserCog />

          Account

        </button>



        <button
          className={
            activeTab === 'appearance'

            ?

            'settings-tab active'

            :

            'settings-tab'
          }

          onClick={() =>
          setActiveTab('appearance')}
        >

          <FaPalette />

          Appearance

        </button>



        <button
          className={
            activeTab === 'productivity'

            ?

            'settings-tab active'

            :

            'settings-tab'
          }

          onClick={() =>
          setActiveTab('productivity')}
        >

          <FaClock />

          Productivity

        </button>



        <button
          className={
            activeTab === 'notifications'

            ?

            'settings-tab active'

            :

            'settings-tab'
          }

          onClick={() =>
          setActiveTab('notifications')}
        >

          <FaBell />

          Notifications

        </button>



        <button
          className={
            activeTab === 'ai'

            ?

            'settings-tab active'

            :

            'settings-tab'
          }

          onClick={() =>
          setActiveTab('ai')}
        >

          <FaBrain />

          AI Settings

        </button>



        <button
          className={
            activeTab === 'security'

            ?

            'settings-tab active'

            :

            'settings-tab'
          }

          onClick={() =>
          setActiveTab('security')}
        >

          <FaShieldAlt />

          Security

        </button>

      </div>



      {/* ================= CONTENT ================= */}

      <div className="settings-content">



        <div className="settings-header">

          <h1>

            Settings Center

          </h1>



          <button
            className="save-btn"
            onClick={handleSave}
          >

            {
              saving

              ?

              'Saving...'

              :

              <>

                <FaSave />

                Save Changes

              </>
            }

          </button>

        </div>



        {
          success && (

            <div className="success-box">

              <FaCheckCircle />

              {success}

            </div>
          )
        }



        {
          error && (

            <div className="error-box">

              {error}

            </div>
          )
        }



        {/* ================= ACCOUNT ================= */}

        {
          activeTab === 'account'

          &&

          <div className="settings-card">


            <h2>

              Account Settings

            </h2>



            <div className="input-group">

              <label>

                Full Name

              </label>

              <input
                type="text"
                name="name"
                value={settings.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />

            </div>



            <div className="input-group">

              <label>

                Profile Photo URL

              </label>

              <input
                type="text"
                name="photo"
                value={settings.photo}
                onChange={handleChange}
                placeholder="Paste image url"
              />

            </div>

          </div>
        }



        {/* ================= APPEARANCE ================= */}

        {
          activeTab === 'appearance'

          &&

          <div className="settings-card">


            <h2>

              Appearance Settings

            </h2>



            <div className="toggle-row">

              <div>

                <h3>
                  Theme Mode
                </h3>

                <p>
                  Switch between dark and light
                </p>

              </div>



              <button
                className="theme-toggle"
                onClick={toggleTheme}
              >

                {
                  theme === 'dark'

                  ?

                  <FaMoon />

                  :

                  <FaSun />
                }

              </button>

            </div>



            <div className="toggle-row">

              <div>

                <h3>
                  Compact Mode
                </h3>

              </div>



              <input
                type="checkbox"
                name="compactMode"
                checked={settings.compactMode}
                onChange={handleChange}
              />

            </div>

          </div>
        }



        {/* ================= PRODUCTIVITY ================= */}

        {
          activeTab === 'productivity'

          &&

          <div className="settings-card">


            <h2>

              Productivity Engine

            </h2>



            <div className="input-group">

              <label>

                Focus Duration

              </label>

              <input
                type="number"
                name="focusDuration"
                value={settings.focusDuration}
                onChange={handleChange}
              />

            </div>



            <div className="input-group">

              <label>

                Break Duration

              </label>

              <input
                type="number"
                name="breakDuration"
                value={settings.breakDuration}
                onChange={handleChange}
              />

            </div>



            <div className="toggle-row">

              <div>

                <h3>

                  Deep Focus Shield

                </h3>

              </div>



              <input
                type="checkbox"
                name="deepFocus"
                checked={settings.deepFocus}
                onChange={handleChange}
              />

            </div>

          </div>
        }



        {/* ================= NOTIFICATIONS ================= */}

        {
          activeTab === 'notifications'

          &&

          <div className="settings-card">


            <h2>

              Notification Center

            </h2>



            <div className="toggle-row">

              <div>

                <h3>

                  Push Notifications

                </h3>

              </div>



              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />

            </div>



            <div className="toggle-row">

              <div>

                <h3>

                  Streak Alerts

                </h3>

              </div>



              <input
                type="checkbox"
                name="streakAlerts"
                checked={settings.streakAlerts}
                onChange={handleChange}
              />

            </div>

          </div>
        }



        {/* ================= AI ================= */}

        {
          activeTab === 'ai'

          &&

          <div className="settings-card">


            <h2>

              AI Engine

            </h2>



            <div className="toggle-row">

              <div>

                <h3>

                  AI Productivity Mode

                </h3>

              </div>



              <input
                type="checkbox"
                name="aiMode"
                checked={settings.aiMode}
                onChange={handleChange}
              />

            </div>



            <div className="ai-status">

              <FaRobot />

              <div>

                <h3>

                  Neural Stability

                </h3>

                <p>

                  92% Stable

                </p>

              </div>

            </div>



            <div className="ai-status">

              <FaFire />

              <div>

                <h3>

                  Burnout Risk

                </h3>

                <p>

                  Low

                </p>

              </div>

            </div>

          </div>
        }



        {/* ================= SECURITY ================= */}

        {
          activeTab === 'security'

          &&

          <div className="settings-card">


            <h2>

              Security Settings

            </h2>



            <div className="input-group">

              <label>

                New Password

              </label>

              <input
                type="password"
                name="newPassword"
                value={settings.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
              />

            </div>



            <button
              className="logout-btn"
              onClick={handleLogout}
            >

              <FaSignOutAlt />

              Logout

            </button>

          </div>
        }

      </div>

    </div>
  )
}

export default Settings