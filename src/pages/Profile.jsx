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
  FaEdit,
  FaCheckCircle,
  FaChartLine,
  FaUserAstronaut,
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
    user,
    setUser
  }
  =
  useContext(AuthContext)



  const {
    theme
  }
  =
  useContext(ThemeContext)



  /* ================= STATES ================= */

  const [loading,setLoading] =
  useState(true)

  const [saving,setSaving] =
  useState(false)

  const [uploading,setUploading] =
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

        if(!user?.firebaseUser){

          setLoading(false)

          return
        }



        const docRef = doc(

          db,
          'users',
          user.firebaseUser.uid
        )



        const docSnap =
        await getDoc(docRef)



        /* ================= USER EXISTS ================= */

        if(docSnap.exists()){

          const data =
          docSnap.data()



          setProfile({

            name:

            data.name

            ||

            user?.firebaseUser?.displayName

            ||

            '',



            bio:

            data.bio

            ||

            'AI Powered Productivity Explorer',



            university:

            data.university

            ||

            '',



            github:

            data.github

            ||

            '',



            linkedin:

            data.linkedin

            ||

            '',



            location:

            data.location

            ||

            '',



            photo:

            data.photo

            ||

            user?.firebaseUser?.photoURL

            ||

            ''
          })
        }



        /* ================= CREATE USER ================= */

        else{

          const defaultData = {

            name:

            user?.firebaseUser?.displayName

            ||

            'User',



            email:

            user?.firebaseUser?.email

            ||

            '',



            bio:

            'AI Powered Productivity Explorer',



            university:'',
            github:'',
            linkedin:'',
            location:'',



            photo:

            user?.firebaseUser?.photoURL

            ||

            ''
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



/* ================= CLOUDINARY IMAGE UPLOAD ================= */

const handleImageUpload =
async (e) => {

  try{

    const file =
    e.target.files[0]



    if(!file){

      return
    }



    /* ================= FILE VALIDATION ================= */

    if(

      !file.type.startsWith(
        'image/'
      )
    ){

      setError(
        'Please upload an image file'
      )

      return
    }



    /* ================= MAX SIZE ================= */

    if(file.size > 5000000){

      setError(
        'Image size must be under 5MB'
      )

      return
    }



    setUploading(true)

    setError('')

    setSuccess('')



    const formData =
    new FormData()



    formData.append(
      'file',
      file
    )



    formData.append(
      'upload_preset',
      'neuroorbit'
    )



    const response =
    await fetch(

      'https://api.cloudinary.com/v1_1/dbw95ecca/image/upload',

      {

        method:'POST',

        body:formData
      }
    )



    const data =
await response.json()



console.log(data)







    /* ================= UPLOAD FAILED ================= */

    if(!response.ok){

      setError(

        data.error?.message

        ||

        'Image upload failed'
      )

      return
    }



    /* ================= NO IMAGE ================= */

    if(!data.secure_url){

      setError(
        'Failed to get image URL'
      )

      return
    }



    /* ================= UPDATE PROFILE ================= */

    /* ================= UPDATE PROFILE ================= */

const updatedProfile = {

  ...profile,

  photo:data.secure_url
}



/* ================= LOCAL STATE ================= */

setProfile(updatedProfile)



/* ================= SAVE FIRESTORE ================= */

await setDoc(

  doc(
    db,
    'users',
    user.firebaseUser.uid
  ),

  updatedProfile,

  {
    merge:true
  }
)



/* ================= REALTIME UPDATE ================= */

setUser({

  ...user,

  firebaseUser:{

    ...user.firebaseUser,

    photoURL:data.secure_url
  },

  profile:updatedProfile
})



    /* ================= REALTIME UPDATE ================= */

    setUser({

      ...user,

      firebaseUser:{

        ...user.firebaseUser,

        photoURL:data.secure_url
      }
    })



    setSuccess(
      'Photo uploaded successfully'
    )

  }

  catch(error){

    console.log(error)



    setError(

      error.message

      ||

      'Failed to upload image'
    )
  }

  finally{

    setUploading(false)
  }
}



  /* ================= SAVE PROFILE ================= */

  const handleSave = async () => {

    try{

      setSaving(true)

      setSuccess('')

      setError('')



      const docRef = doc(

        db,
        'users',
        user.firebaseUser.uid
      )



      const updatedData = {

        ...profile,

        email:
        user?.firebaseUser?.email
      }



      /* ================= SAVE FIRESTORE ================= */

      await setDoc(

        docRef,

        updatedData,

        {
          merge:true
        }
      )



      /* ================= UPDATE FIREBASE AUTH ================= */

      try{

        await updateProfile(

          user.firebaseUser,

          {

            displayName:
            profile.name,

            photoURL:
            profile.photo
          }
        )

      }

      catch(authError){

        console.log(

          'Firebase Auth Update Error:',

          authError
        )
      }



      /* ================= LOCAL PROFILE STATE ================= */

      setProfile({

        ...updatedData
      })



      /* ================= REALTIME GLOBAL USER UPDATE ================= */

      setUser({

        firebaseUser:
        {

          ...user.firebaseUser,

          displayName:
          profile.name,

          photoURL:
          profile.photo
        },

        profile:
        updatedData
      })



      setSuccess(
        'Profile updated successfully'
      )

    }

    catch(error){

      console.log(error)



      setError(

        error.message

        ||

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

                  user?.firebaseUser?.email
                  ?.charAt(0)
                  ?.toUpperCase()

                  ||

                  'U'
                }

              </div>
            }



            {/* ================= CAMERA ================= */}

            <label className="camera-badge">


              {

                uploading

                ?

                '...'

                :

                <FaCamera />
              }



              <input

                type="file"

                accept="image/*"

                hidden

                onChange={handleImageUpload}
              />

            </label>

          </div>



          {/* ================= INFO ================= */}

          <div className="profile-info">



            <h1>

              {

                profile.name

                ||

                user?.firebaseUser?.displayName

                ||

                'User'
              }

            </h1>



            <p>

              {

                profile.bio

                ||

                'AI Productivity Explorer'
              }

            </p>



            <div className="profile-email">

              <FaEnvelope />

              <span>

                {

                  user?.firebaseUser?.email
                }

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

    </div>
  )
}

export default Profile