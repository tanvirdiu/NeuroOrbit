import '../styles/Profile.css'

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

  doc,
  getDoc,
  setDoc

}
from 'firebase/firestore'

import {

  updateProfile

}
from 'firebase/auth'

import {
  db
}
from '../firebase/firebase'

import {

  FaBrain,
  FaBolt,
  FaFire,
  FaClock,
  FaRocket,
  FaTrophy,
  FaEdit,
  FaCheckCircle,
  FaChartLine,
  FaStar,
  FaUserAstronaut,
  FaMoon,
  FaCode,
  FaDatabase,
  FaPaintBrush,
  FaLaptopCode,
  FaSave,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCamera

}
from 'react-icons/fa'



function Profile() {



  /* ================= CONTEXT ================= */

  const {
    user
  } = useContext(AuthContext)



  const {
    theme
  } = useContext(ThemeContext)



  /* ================= STATES ================= */

  const [loading,setLoading] =
  useState(true)

  const [saving,setSaving] =
  useState(false)

  const [success,setSuccess] =
  useState('')

  const [error,setError] =
  useState('')



  const [profile,setProfile] =
  useState({

    name:'',
    bio:'',
    university:'',
    github:'',
    linkedin:'',
    location:'',
    photo:''
  })



  /* ================= FETCH PROFILE ================= */

  useEffect(() => {

    const fetchProfile = async () => {

      try{

        if(!user){

          setLoading(false)

          return
        }



        const docRef = doc(

          db,
          'users',
          user.uid
        )



        const docSnap =
        await getDoc(docRef)



        /* ===== USER EXISTS ===== */

        if(docSnap.exists()){

          const data =
          docSnap.data()



          setProfile({

            name:
            data.name
            || user.displayName
            || '',

            bio:
            data.bio
            || 'AI Powered Productivity Explorer',

            university:
            data.university
            || '',

            github:
            data.github
            || '',

            linkedin:
            data.linkedin
            || '',

            location:
            data.location
            || '',

            photo:
            data.photo
            || user.photoURL
            || ''
          })
        }



        /* ===== CREATE NEW USER ===== */

        else{

          const defaultData = {

            name:
            user.displayName
            || '',

            email:
            user.email
            || '',

            bio:
            'AI Powered Productivity Explorer',

            university:'',
            github:'',
            linkedin:'',
            location:'',

            photo:
            user.photoURL
            || ''
          }



          await setDoc(

            docRef,

            defaultData
          )



          setProfile(defaultData)
        }

      }

      catch(error){

        console.log(error)

        setError(
          'Failed to load profile'
        )
      }

      finally{

        setLoading(false)
      }
    }

    fetchProfile()

  },[user])



  /* ================= INPUT ================= */

  const handleChange = (e) => {

    setProfile({

      ...profile,

      [e.target.name]:
      e.target.value
    })
  }



  /* ================= SAVE ================= */

  const handleSave = async () => {

    try{

      setSaving(true)

      setSuccess('')

      setError('')



      const docRef = doc(

        db,
        'users',
        user.uid
      )



      const updatedData = {

        ...profile,

        email:
        user.email
      }



      /* ===== SAVE FIRESTORE ===== */

      await setDoc(

        docRef,

        updatedData,

        {
          merge:true
        }
      )



      /* ===== UPDATE AUTH ===== */

      await updateProfile(

        user,

        {

          displayName:
          profile.name,

          photoURL:
          profile.photo
        }
      )



      /* ===== UPDATE UI ===== */

      setProfile(updatedData)



      setSuccess(
        'Profile updated successfully'
      )

    }

    catch(error){

      console.log(error)

      setError(
        'Failed to update profile'
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



  /* ================= LOADING ================= */

  if(loading){

    return(

      <div className="profile-loading">

        Loading Profile...

      </div>
    )
  }



  return (

    <div className={`profile-page ${theme}`}>



      {/* ================= HERO ================= */}

      <section className="profile-hero">


        <div className="profile-left">



          {/* ================= AVATAR ================= */}

          <div className="profile-avatar-wrapper">


            {
              profile.photo

              ?

              <img
                src={profile.photo}
                alt="Profile"
                className="profile-avatar-image"
              />

              :

              <div className="profile-avatar">

                {
                  profile.name
                  ?.charAt(0)
                  ?.toUpperCase()

                  ||

                  user?.email
                  ?.charAt(0)
                  ?.toUpperCase()
                }

              </div>
            }



            <div className="camera-badge">

              <FaCamera />

            </div>

          </div>



          {/* ================= INFO ================= */}

          <div className="profile-info">


            <h1>

              {
                profile.name
                || 'NeuroOrbit User'
              }

            </h1>



            <p>

              {
                profile.bio
                || 'AI Productivity Explorer'
              }

            </p>



            <div className="profile-email">

              <FaEnvelope />

              <span>

                {user?.email}

              </span>

            </div>



            <div className="profile-tags">


              <span>

                <FaBrain />

                Night Strategist

              </span>



              <span>

                <FaRocket />

                Level 07

              </span>



              <span>

                <FaFire />

                7 Day Streak

              </span>

            </div>

          </div>

        </div>



        {/* ================= XP ================= */}

        <div className="profile-right">


          <div className="xp-card">


            <h2>

              1840 XP

            </h2>



            <p>

              Orbit Intelligence Score

            </p>



            <div className="xp-bar">

              <div className="xp-fill"></div>

            </div>

          </div>

        </div>

      </section>



      {/* ================= STATS ================= */}

      <section className="profile-stats">


        <div className="stat-card">

          <FaCheckCircle />

          <h2>124</h2>

          <p>Completed Tasks</p>

        </div>



        <div className="stat-card">

          <FaClock />

          <h2>312h</h2>

          <p>Focus Hours</p>

        </div>



        <div className="stat-card">

          <FaBolt />

          <h2>89%</h2>

          <p>Productivity</p>

        </div>



        <div className="stat-card">

          <FaChartLine />

          <h2>92%</h2>

          <p>Neural Sync</p>

        </div>

      </section>



      {/* ================= GRID ================= */}

      <section className="profile-grid">



        {/* ================= FORM ================= */}

        <div className="profile-form-card">


          <div className="card-title">

            <FaEdit />

            <h2>
              Edit Profile
            </h2>

          </div>



          {
            success && (

              <div className="success-box">

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



          {/* ================= NAME ================= */}

          <div className="input-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />

          </div>



          {/* ================= BIO ================= */}

          <div className="input-group">

            <label>
              Bio
            </label>

            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder="Write your bio"
            ></textarea>

          </div>



          {/* ================= PHOTO ================= */}

          <div className="input-group">

            <label>
              Profile Photo URL
            </label>

            <input
              type="text"
              name="photo"
              value={profile.photo}
              onChange={handleChange}
              placeholder="Paste image url"
            />

          </div>



          {/* ================= UNIVERSITY ================= */}

          <div className="input-group">

            <label>
              University
            </label>

            <input
              type="text"
              name="university"
              value={profile.university}
              onChange={handleChange}
              placeholder="University name"
            />

          </div>



          {/* ================= GITHUB ================= */}

          <div className="input-group">

            <label>

              <FaGithub />

              GitHub

            </label>

            <input
              type="text"
              name="github"
              value={profile.github}
              onChange={handleChange}
              placeholder="GitHub profile"
            />

          </div>



          {/* ================= LINKEDIN ================= */}

          <div className="input-group">

            <label>

              <FaLinkedin />

              LinkedIn

            </label>

            <input
              type="text"
              name="linkedin"
              value={profile.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn profile"
            />

          </div>



          {/* ================= LOCATION ================= */}

          <div className="input-group">

            <label>

              <FaMapMarkerAlt />

              Location

            </label>

            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              placeholder="Your location"
            />

          </div>



          {/* ================= SAVE BUTTON ================= */}

          <button
            className="save-btn"
            onClick={handleSave}
            disabled={saving}
          >

            {
              saving

              ?

              'Saving...'

              :

              <>

                <FaSave />

                Save Profile

              </>
            }

          </button>

        </div>



        {/* ================= AI PROFILE ================= */}

        <div className="ai-profile-card">


          <div className="card-title">

            <FaUserAstronaut />

            <h2>
              AI Personality
            </h2>

          </div>



          <div className="ai-box">

            <h3>
              Learning Type
            </h3>

            <p>
              Adaptive Deep Worker
            </p>

          </div>



          <div className="ai-box">

            <h3>
              Best Productivity Time
            </h3>

            <p>
              8 PM - 11 PM
            </p>

          </div>



          <div className="ai-box">

            <h3>
              Orbit Aura
            </h3>

            <p>
              Focused & Stable
            </p>

          </div>



          <div className="ai-box">

            <h3>
              AI Observation
            </h3>

            <p>
              Coding tasks complete faster
              than theoretical tasks.
            </p>

          </div>



          <div className="ai-box">

            <h3>
              Neural Sync
            </h3>

            <p>
              92% Stability Achieved
            </p>

          </div>

        </div>

      </section>



      {/* ================= SKILLS ================= */}

      <section className="skills-section">


        <div className="section-title">

          <h2>
            Skill Galaxy
          </h2>

        </div>



        <div className="skills-grid">


          <div className="skill-card">

            <FaCode />

            <h3>
              React
            </h3>

            <div className="skill-bar">

              <div
                className="skill-fill"
                style={{width:'90%'}}
              ></div>

            </div>

          </div>



          <div className="skill-card">

            <FaDatabase />

            <h3>
              Firebase
            </h3>

            <div className="skill-bar">

              <div
                className="skill-fill"
                style={{width:'82%'}}
              ></div>

            </div>

          </div>



          <div className="skill-card">

            <FaPaintBrush />

            <h3>
              UI Design
            </h3>

            <div className="skill-bar">

              <div
                className="skill-fill"
                style={{width:'88%'}}
              ></div>

            </div>

          </div>



          <div className="skill-card">

            <FaLaptopCode />

            <h3>
              Problem Solving
            </h3>

            <div className="skill-bar">

              <div
                className="skill-fill"
                style={{width:'85%'}}
              ></div>

            </div>

          </div>

        </div>

      </section>



      {/* ================= ACHIEVEMENTS ================= */}

      <section className="achievement-section">


        <div className="section-title">

          <h2>
            Achievement Collection
          </h2>

        </div>



        <div className="achievement-grid">


          <div className="achievement-card">

            <FaTrophy />

            <h3>
              Deep Work Master
            </h3>

          </div>



          <div className="achievement-card">

            <FaStar />

            <h3>
              Orbit Commander
            </h3>

          </div>



          <div className="achievement-card">

            <FaMoon />

            <h3>
              Night Strategist
            </h3>

          </div>



          <div className="achievement-card">

            <FaRocket />

            <h3>
              Productivity Hero
            </h3>

          </div>

        </div>

      </section>

    </div>
  )
}

export default Profile