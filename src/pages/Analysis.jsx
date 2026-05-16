import '../styles/Analysis.css'

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts'

import {
  FaBrain,
  FaBolt,
  FaFire,
  FaClock,
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle,
  FaRocket,
  FaCalendarAlt,
  FaLightbulb,
  FaAward,
  FaChartPie
} from 'react-icons/fa'

function Analysis() {

  const weeklyData = [

    { day: 'Mon', hours: 2, tasks: 1 },
    { day: 'Tue', hours: 4, tasks: 3 },
    { day: 'Wed', hours: 3, tasks: 2 },
    { day: 'Thu', hours: 6, tasks: 5 },
    { day: 'Fri', hours: 5, tasks: 4 },
    { day: 'Sat', hours: 7, tasks: 6 },
    { day: 'Sun', hours: 4, tasks: 3 }

  ]


  const pieData = [

    { name: 'Completed', value: 68 },
    { name: 'Pending', value: 22 },
    { name: 'Overdue', value: 10 }

  ]

  const COLORS = [
    '#8b5cf6',
    '#3b82f6',
    '#ef4444'
  ]


  const radarData = [

    {
      subject: 'Focus',
      value: 80
    },

    {
      subject: 'Consistency',
      value: 74
    },

    {
      subject: 'Discipline',
      value: 85
    },

    {
      subject: 'Speed',
      value: 68
    },

    {
      subject: 'Creativity',
      value: 91
    },

    {
      subject: 'Energy',
      value: 72
    }

  ]


  const progressData = [

    {
      week: 'Week 1',
      productivity: 45
    },

    {
      week: 'Week 2',
      productivity: 60
    },

    {
      week: 'Week 3',
      productivity: 74
    },

    {
      week: 'Week 4',
      productivity: 88
    }

  ]


  return (

    <div className="analysis-page">


      {/* ================= HERO ================= */}

      <section className="analysis-hero">

        <div className="analysis-hero-left">

          <h4>
            NeuroOrbit Intelligence Center
          </h4>

          <h1>
            Productivity Analysis Dashboard
          </h1>

          <p>
            Track your learning performance,
            productivity growth, workload,
            focus level and smart AI insights
            from one intelligent workspace.
          </p>

        </div>


        <div className="orbit-score-card">

          <div className="orbit-ring">

            <h2>87</h2>

            <span>
              Orbit Score
            </span>

          </div>

        </div>

      </section>



      {/* ================= STATS ================= */}

      <section className="analysis-stats">

        <div className="analysis-card">

          <FaCheckCircle className="analysis-icon" />

          <h2>24</h2>

          <p>Completed Tasks</p>

        </div>



        <div className="analysis-card">

          <FaClock className="analysis-icon" />

          <h2>42h</h2>

          <p>Study Hours</p>

        </div>



        <div className="analysis-card">

          <FaFire className="analysis-icon" />

          <h2>7 Days</h2>

          <p>Focus Streak</p>

        </div>



        <div className="analysis-card">

          <FaRocket className="analysis-icon" />

          <h2>82%</h2>

          <p>Weekly Productivity</p>

        </div>

      </section>



      {/* ================= CHARTS ================= */}

      <section className="charts-grid">


        {/* ===== AREA CHART ===== */}

        <div className="chart-card large-chart">

          <div className="chart-title">

            <FaChartLine />

            <h3>
              Weekly Study Analytics
            </h3>

          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <AreaChart data={weeklyData}>

              <defs>

                <linearGradient
                  id="colorHours"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#8b5cf6"
                    stopOpacity={0.8}
                  />

                  <stop
                    offset="95%"
                    stopColor="#8b5cf6"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="hours"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#colorHours)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>



        {/* ===== PIE CHART ===== */}

        <div className="chart-card">

          <div className="chart-title">

            <FaChartPie />

            <h3>
              Task Distribution
            </h3>

          </div>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >

                {
                  pieData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))
                }

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>



        {/* ===== BAR CHART ===== */}

        <div className="chart-card">

          <div className="chart-title">

            <FaBolt />

            <h3>
              Completed Tasks
            </h3>

          </div>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart data={weeklyData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="tasks"
                fill="#3b82f6"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>



        {/* ===== RADAR ===== */}

        <div className="chart-card">

          <div className="chart-title">

            <FaBrain />

            <h3>
              Productivity DNA
            </h3>

          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <RadarChart data={radarData}>

              <PolarGrid />

              <PolarAngleAxis dataKey="subject" />

              <PolarRadiusAxis />

              <Radar
                name="Performance"
                dataKey="value"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.5}
              />

            </RadarChart>

          </ResponsiveContainer>

        </div>

      </section>



      {/* ================= AI SECTION ================= */}

      <section className="ai-section">


        <div className="ai-card">

          <FaBrain className="ai-icon" />

          <h3>
            AI Productivity Insight
          </h3>

          <p>
            Your productivity increased
            by 18% compared to last week.
            Evening study sessions show
            higher completion rates.
          </p>

        </div>



        <div className="ai-card warning-card">

          <FaExclamationTriangle className="ai-icon" />

          <h3>
            Burnout Predictor
          </h3>

          <p>
            Your workload is slightly high.
            Complete urgent assignments first
            and take short recovery breaks.
          </p>

        </div>



        <div className="ai-card">

          <FaLightbulb className="ai-icon" />

          <h3>
            Smart Recommendation
          </h3>

          <p>
            Focus on React project tasks today.
            They have the highest impact on
            your weekly orbit score.
          </p>

        </div>

      </section>



      {/* ================= TIMELINE ================= */}

      <section className="timeline-section">

        <div className="section-heading">

          <h2>
            Neural Activity Feed
          </h2>

        </div>


        <div className="timeline-container">


          <div className="timeline-item">

            <span>
              10:42 PM
            </span>

            <h3>
              Completed DBMS Assignment
            </h3>

            <p>
              High priority task completed successfully.
            </p>

          </div>



          <div className="timeline-item">

            <span>
              08:10 PM
            </span>

            <h3>
              Started React UI Project
            </h3>

            <p>
              Progress updated to 65%.
            </p>

          </div>



          <div className="timeline-item">

            <span>
              06:30 PM
            </span>

            <h3>
              Focus Session Finished
            </h3>

            <p>
              2 hour deep work session completed.
            </p>

          </div>

        </div>

      </section>



      {/* ================= PROGRESS ================= */}

      <section className="progress-section">

        <div className="progress-chart-card">

          <div className="chart-title">

            <FaCalendarAlt />

            <h3>
              Monthly Growth
            </h3>

          </div>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart data={progressData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="week" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="productivity"
                stroke="#8b5cf6"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </section>



      {/* ================= ACHIEVEMENTS ================= */}

      <section className="achievement-section">

        <div className="section-heading">

          <h2>
            Achievement System
          </h2>

        </div>


        <div className="achievement-grid">


          <div className="achievement-card">

            <FaAward className="achievement-icon" />

            <h3>
              Productivity Hero
            </h3>

            <p>
              Completed 20+ tasks
            </p>

          </div>



          <div className="achievement-card">

            <FaFire className="achievement-icon" />

            <h3>
              7 Day Streak
            </h3>

            <p>
              Active every day
            </p>

          </div>



          <div className="achievement-card">

            <FaRocket className="achievement-icon" />

            <h3>
              Orbit Master
            </h3>

            <p>
              Reached 85+ orbit score
            </p>

          </div>

        </div>

      </section>

    </div>

  )
}

export default Analysis