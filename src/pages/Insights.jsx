import '../styles/Insights.css'

import {
  FaBrain,
  FaBolt,
  FaFire,
  FaMoon,
  FaRocket,
  FaClock,
  FaLightbulb,
  FaExclamationTriangle,
  FaChartLine,
  FaBullseye,
  FaRobot,
  FaTrophy,
  FaCheckCircle,
  FaStar,
  FaMeteor,
  FaSatellite,
  FaAtom,
  FaCloudMoon,
  FaGlobe,
  FaMagic,
  FaBatteryFull,
  FaEye
} from 'react-icons/fa'

function Insights() {

  const missions = [

    {
      title:'Complete React Assignment',
      status:'High Priority'
    },

    {
      title:'2 Focus Sessions',
      status:'In Progress'
    },

    {
      title:'Database Revision',
      status:'Recommended'
    }

  ]


  const reflections = [

    'You completed more tasks than last week.',

    'Your focus performance improves during night sessions.',

    'Coding assignments are completed faster than theory tasks.',

    'Missed deadlines reduced productivity efficiency by 12%.'

  ]


  const neuralFeed = [

    'AI detected improved completion speed.',

    'High cognitive activity detected at 10 PM.',

    'Consistency score increased by 18%.',

    'Orbit Intelligence Engine updated your focus pattern.',

    'Neural sync stabilized after focus sessions.'

  ]


  const achievements = [

    'Deep Work Master',

    '7 Day Streak',

    'Orbit Commander',

    'Focus Warrior',

    'Neural Productivity Hero'

  ]


  return (

    <div className="insights-page">


      {/* ================= BACKGROUND EFFECTS ================= */}

      <div className="grid-bg"></div>

      <div className="glow glow1"></div>

      <div className="glow glow2"></div>

      <div className="glow glow3"></div>



      {/* ================= HERO ================= */}

      <section className="insights-hero">


        <div className="hero-left">

          <span className="hero-badge">

            NeuroOrbit AI Intelligence
          </span>

          <h1>
            AI Insights & Neural Intelligence System
          </h1>

          <p>
            Analyze behavior patterns, predict productivity,
            optimize learning flow and unlock intelligent
            recommendations powered by the NeuroOrbit
            cognitive engine.
          </p>


          <div className="hero-buttons">

            <button>
              AI Overview
            </button>

            <button className="secondary-btn">
              Neural Scan
            </button>

          </div>

        </div>



        <div className="hero-right">

          <div className="brain-core">

            <FaBrain />

          </div>

        </div>

      </section>



      {/* ================= TOP STATS ================= */}

      <section className="insight-stats">


        <div className="insight-card">

          <FaRocket className="insight-icon" />

          <h2>89%</h2>

          <p>Neural Sync</p>

        </div>



        <div className="insight-card">

          <FaFire className="insight-icon" />

          <h2>High</h2>

          <p>Momentum Level</p>

        </div>



        <div className="insight-card">

          <FaBrain className="insight-icon" />

          <h2>Night Strategist</h2>

          <p>Learning Personality</p>

        </div>



        <div className="insight-card">

          <FaBolt className="insight-icon" />

          <h2>76%</h2>

          <p>Tomorrow Prediction</p>

        </div>

      </section>



      {/* ================= AI RECOMMENDATIONS ================= */}

      <section className="recommendation-grid">


        <div className="recommendation-card">

          <FaLightbulb className="recommendation-icon" />

          <h3>
            Smart Recommendation
          </h3>

          <p>
            Complete React assignment first.
            It has the highest productivity
            impact on your weekly orbit score.
          </p>

        </div>



        <div className="recommendation-card warning">

          <FaExclamationTriangle
            className="recommendation-icon"
          />

          <h3>
            Burnout Warning
          </h3>

          <p>
            Cognitive load is increasing.
            Take a short recovery break after
            completing urgent assignments.
          </p>

        </div>



        <div className="recommendation-card">

          <FaClock className="recommendation-icon" />

          <h3>
            Focus Pattern
          </h3>

          <p>
            Peak performance detected between
            8 PM and 11 PM.
          </p>

        </div>

      </section>



      {/* ================= AI GRID ================= */}

      <section className="ai-grid">


        {/* ===== PRODUCTIVITY WEATHER ===== */}

        <div className="ai-box">

          <div className="ai-title">

            <FaCloudMoon />

            <h3>
              Productivity Weather
            </h3>

          </div>

          <h2>
            High Focus Storm ⚡
          </h2>

          <p>
            Your current mental state indicates
            strong focus capability and high
            task execution potential.
          </p>

        </div>



        {/* ===== COGNITIVE LOAD ===== */}

        <div className="ai-box">

          <div className="ai-title">

            <FaBrain />

            <h3>
              Cognitive Pressure
            </h3>

          </div>

          <h2>
            Moderate Load
          </h2>

          <p>
            Pending tasks are balanced,
            but deadline pressure is rising.
          </p>

        </div>



        {/* ===== FUTURE SELF ===== */}

        <div className="ai-box">

          <div className="ai-title">

            <FaRocket />

            <h3>
              Future Projection
            </h3>

          </div>

          <h2>
            Semester Goals Achievable
          </h2>

          <p>
            Current productivity trend predicts
            early completion within 12 days.
          </p>

        </div>



        {/* ===== AI TWIN ===== */}

        <div className="ai-box">

          <div className="ai-title">

            <FaRobot />

            <h3>
              AI Productivity Twin
            </h3>

          </div>

          <h2>
            Stability Increasing
          </h2>

          <p>
            Your AI twin predicts stronger
            consistency over the next 5 days.
          </p>

        </div>

      </section>



      {/* ================= MISSIONS ================= */}

      <section className="mission-section">

        <div className="section-heading">

          <h2>
            AI Mission Control
          </h2>

        </div>


        <div className="mission-grid">

          {
            missions.map((mission,index) => (

              <div
                className="mission-card"
                key={index}
              >

                <FaBullseye />

                <h3>
                  {mission.title}
                </h3>

                <span>
                  {mission.status}
                </span>

              </div>
            ))
          }

        </div>

      </section>



      {/* ================= WEEKLY REFLECTION ================= */}

      <section className="reflection-section">

        <div className="section-heading">

          <h2>
            AI Reflection Journal
          </h2>

        </div>


        <div className="reflection-container">

          {
            reflections.map((item,index) => (

              <div
                className="reflection-card"
                key={index}
              >

                <FaCheckCircle />

                <p>
                  {item}
                </p>

              </div>
            ))
          }

        </div>

      </section>



      {/* ================= ORBIT SYSTEM ================= */}

      <section className="orbit-system">


        <div className="orbit-card">

          <FaSatellite className="orbit-icon" />

          <h3>
            Orbit Intelligence Score
          </h3>

          <h1>
            92
          </h1>

        </div>



        <div className="orbit-card">

          <FaBatteryFull className="orbit-icon" />

          <h3>
            Energy Pulse
          </h3>

          <h1>
            Stable
          </h1>

        </div>



        <div className="orbit-card">

          <FaEye className="orbit-icon" />

          <h3>
            AI Observation
          </h3>

          <h1>
            Adaptive Focus
          </h1>

        </div>

      </section>



      {/* ================= ACHIEVEMENTS ================= */}

      <section className="achievement-section">

        <div className="section-heading">

          <h2>
            Achievement Evolution
          </h2>

        </div>


        <div className="achievement-grid">

          {
            achievements.map((item,index) => (

              <div
                className="achievement-card"
                key={index}
              >

                <FaTrophy />

                <h3>
                  {item}
                </h3>

              </div>
            ))
          }

        </div>

      </section>



      {/* ================= NEURAL FEED ================= */}

      <section className="feed-section">

        <div className="section-heading">

          <h2>
            Neural Activity Feed
          </h2>

        </div>


        <div className="feed-container">

          {
            neuralFeed.map((feed,index) => (

              <div
                className="feed-card"
                key={index}
              >

                <FaAtom />

                <p>
                  {feed}
                </p>

              </div>
            ))
          }

        </div>

      </section>



      {/* ================= AI QUOTE ================= */}

      <section className="quote-section">

        <FaMagic className="quote-icon" />

        <h2>
          Small progress is still progress.
        </h2>

        <p>
          NeuroOrbit AI Motivation Engine
        </p>

      </section>



      {/* ================= FOOTER PANEL ================= */}

      <section className="footer-panel">


        <div className="footer-box">

          <FaGlobe />

          <h3>
            Neural Universe Active
          </h3>

        </div>



        <div className="footer-box">

          <FaMeteor />

          <h3>
            Orbit Systems Stable
          </h3>

        </div>



        <div className="footer-box">

          <FaStar />

          <h3>
            AI Core Running
          </h3>

        </div>

      </section>

    </div>
  )
}

export default Insights