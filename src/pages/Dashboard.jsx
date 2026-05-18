import {
  useNavigate
}
from 'react-router-dom'

import {
  useContext
}
from 'react'

import {
  AuthContext
}
from '../context/AuthContext'



function Dashboard() {



  /* ================= NAVIGATE ================= */

  const navigate =
  useNavigate()



  /* ================= USER ================= */

  const {
    user
  } = useContext(AuthContext)



  /* ================= GREETING ================= */

  const hour =
  new Date().getHours()



  const greeting =

  hour < 12

  ?

  'Good Morning'

  :

  hour < 18

  ?

  'Good Afternoon'

  :

  'Good Evening'



  /* ================= ACTIVITIES ================= */

  const activities = [

    {
      title:'Completed Deep Focus Session',

      time:'2 Hours • 10 Min',

      icon:'⚡'
    },

    {
      title:'Finished AI Assignment',

      time:'Machine Learning Module',

      icon:'📘'
    },

    {
      title:'Productivity Increased',

      time:'+12% This Week',

      icon:'📈'
    }
  ]



  return (

    <div className="dashboard-page">



      {/* ================= HERO ================= */}

      <section className="dashboard-hero glass-card">



        <div className="hero-content">



          <span className="hero-badge">

            ✨ NeuroOrbit AI Workspace

          </span>



          {/* ================= USER INFO ================= */}

          <div className="dashboard-user-info">



            {/* ===== USER AVATAR ===== */}

            <div className="dashboard-user-avatar">



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

                    'U'
                  }

                </span>
              }

            </div>



            {/* ===== GREETING ===== */}

            <h1>

              {greeting},

              <span>

                {

                  user?.profile?.name

                  ||

                  user?.firebaseUser?.displayName

                  ||

                  'User'
                }

              </span>

            </h1>

          </div>



          <p>

            Stay focused, organized and
            productive with your intelligent
            productivity ecosystem.

          </p>



          {/* ================= HERO BUTTONS ================= */}

          <div className="hero-actions">



            <button

              className="hero-btn primary"

              onClick={() =>
                navigate('/focus')
              }
            >

              Start Focus

            </button>



            <button

              className="hero-btn secondary"

              onClick={() =>
                navigate('/analysis')
              }
            >

              View Analytics

            </button>

          </div>

        </div>



        {/* ================= AI CARD ================= */}

        <div className="ai-card">



          <h3>

            🤖 AI Suggestion

          </h3>



          <p>

            Your productivity peaks between
            8PM - 11PM.
            Schedule deep work sessions now.

          </p>



          <button

            onClick={() =>
              navigate('/insights')
            }
          >

            Generate Study Plan

          </button>

        </div>



        <div className="hero-glow" />

      </section>



      {/* ================= STATS ================= */}

      <section className="dashboard-grid">



        <div className="dashboard-card glass-card glow-blue">



          <div className="card-top">



            <div>

              <h3>

                Daily Focus

              </h3>



              <h1>

                5.4h

              </h1>

            </div>



            <div className="card-icon blue">

              ⚡

            </div>

          </div>



          <div className="progress-wrapper">



            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width:'75%'
                }}
              />

            </div>



            <span>

              75% Goal Reached

            </span>

          </div>

        </div>



        <div className="dashboard-card glass-card glow-violet">



          <div className="card-top">



            <div>

              <h3>

                Productivity

              </h3>



              <h1>

                92%

              </h1>

            </div>



            <div className="card-icon violet">

              📈

            </div>

          </div>



          <div className="progress-wrapper">



            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width:'92%'
                }}
              />

            </div>



            <span>

              Excellent Performance

            </span>

          </div>

        </div>



        <div className="dashboard-card glass-card glow-blue">



          <div className="card-top">



            <div>

              <h3>

                Focus Streak

              </h3>



              <h1>

                12 Days

              </h1>

            </div>



            <div className="card-icon blue">

              🔥

            </div>

          </div>



          <p className="card-desc">

            Your consistency is improving
            rapidly this month.

          </p>

        </div>



        <div className="dashboard-card glass-card glow-violet">



          <div className="card-top">



            <div>

              <h3>

                Pending Tasks

              </h3>



              <h1>

                07

              </h1>

            </div>



            <div className="card-icon violet">

              📋

            </div>

          </div>



          <p className="card-desc">

            2 important deadlines are
            approaching soon.

          </p>

        </div>

      </section>



      {/* ================= BOTTOM ================= */}

      <section className="dashboard-bottom">



        {/* ================= ACTIVITY ================= */}

        <div className="activity-box glass-card">



          <div className="section-header">



            <h2>

              Recent Activity

            </h2>



            <button>

              View All

            </button>

          </div>



          <div className="activity-list">



            {
              activities.map((item,index)=>(

                <div
                  className="activity-card"
                  key={index}
                >



                  <div className="activity-icon">

                    {item.icon}

                  </div>



                  <div className="activity-info">



                    <h4>

                      {item.title}

                    </h4>



                    <p>

                      {item.time}

                    </p>

                  </div>



                  <span className="activity-status">

                    Completed

                  </span>

                </div>
              ))
            }

          </div>

        </div>



        {/* ================= SIDE PANEL ================= */}

        <div className="side-panel glass-card">



          <h2>

            Performance

          </h2>



          <div className="performance-circle">



            <div className="circle-inner">



              <h1>

                92%

              </h1>



              <p>

                Efficiency

              </p>

            </div>

          </div>



          <div className="mini-stats">



            <div className="mini-card">



              <span>

                Focus Hours

              </span>



              <h3>

                48h

              </h3>

            </div>



            <div className="mini-card">



              <span>

                Tasks Done

              </span>



              <h3>

                26

              </h3>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default Dashboard