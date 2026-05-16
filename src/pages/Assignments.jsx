import '../styles/Assignments.css'

import {
  useState,
  useEffect,
  useMemo
} from 'react'

import {
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  collection,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore'

import {
  onAuthStateChanged
} from 'firebase/auth'

import {
  auth,
  db
} from '../firebase/firebase'

import {
  FaPlus,
  FaSearch,
  FaTrash,
  FaCheckCircle,
  FaCalendarAlt,
  FaChartLine,
  FaFire,
  FaBolt,
  FaBook,
  FaClock
} from 'react-icons/fa'



function Assignments() {


  /* =========================
     STATES
  ========================= */

  const [user,setUser] =
  useState(null)

  const [loading,setLoading] =
  useState(true)

  const [assignments,setAssignments] =
  useState([])

  const [title,setTitle] =
  useState('')

  const [subject,setSubject] =
  useState('')

  const [hours,setHours] =
  useState('')

  const [priority,setPriority] =
  useState('Medium')

  const [deadline,setDeadline] =
  useState('')

  const [search,setSearch] =
  useState('')

  const [filter,setFilter] =
  useState('All')



  /* =========================
     AUTH CHECK
  ========================= */

  useEffect(()=>{

    const unsubscribe =

    onAuthStateChanged(

      auth,

      (currentUser)=>{

        setUser(currentUser)

        setLoading(false)
      }
    )

    return ()=>unsubscribe()

  },[])



  /* =========================
     REALTIME FIRESTORE
  ========================= */

  useEffect(()=>{

    if(!user) return



    const q = query(

      collection(
        db,
        'users',
        user.uid,
        'assignments'
      ),

      orderBy(
        'createdAt',
        'desc'
      )
    )



    const unsubscribe =

    onSnapshot(

      q,

      (snapshot)=>{

        const data =

        snapshot.docs.map(doc => ({

          id:doc.id,
          ...doc.data()
        }))

        setAssignments(data)
      }
    )



    return ()=>unsubscribe()

  },[user])



  /* =========================
     ADD ASSIGNMENT
  ========================= */

  const addAssignment =
  async()=>{

    if(
      !title.trim() ||
      !subject.trim() ||
      !hours ||
      !deadline
    ){
      return
    }



    try{

      await addDoc(

        collection(
          db,
          'users',
          user.uid,
          'assignments'
        ),

        {
          title,
          subject,
          hours,
          priority,
          deadline,

          progress:0,

          completed:false,

          createdAt:
          new Date()
        }
      )



      setTitle('')
      setSubject('')
      setHours('')
      setPriority('Medium')
      setDeadline('')
    }

    catch(error){

      console.log(error)
    }
  }



  /* =========================
     DELETE
  ========================= */

  const deleteAssignment =
  async(id)=>{

    try{

      await deleteDoc(

        doc(
          db,
          'users',
          user.uid,
          'assignments',
          id
        )
      )

    }

    catch(error){

      console.log(error)
    }
  }



  /* =========================
     COMPLETE
  ========================= */

  const toggleComplete =
  async(item)=>{

    try{

      await updateDoc(

        doc(
          db,
          'users',
          user.uid,
          'assignments',
          item.id
        ),

        {
          completed:
          !item.completed,

          progress:
          !item.completed
          ? 100
          : 0
        }
      )

    }

    catch(error){

      console.log(error)
    }
  }



  /* =========================
     PROGRESS
  ========================= */

  const increaseProgress =
  async(item)=>{

    const newProgress =

    item.progress >= 100

    ? 100

    : item.progress + 10



    try{

      await updateDoc(

        doc(
          db,
          'users',
          user.uid,
          'assignments',
          item.id
        ),

        {
          progress:newProgress,

          completed:
          newProgress === 100
        }
      )

    }

    catch(error){

      console.log(error)
    }
  }



  /* =========================
     FILTER
  ========================= */

  const filteredAssignments =
  useMemo(()=>{

    return assignments.filter(item => {

      const matchSearch =

        item.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )



      const matchFilter =

        filter === 'All'

        ? true

        : filter === 'Completed'

        ? item.completed

        : filter === 'Pending'

        ? !item.completed

        : item.priority === filter



      return (
        matchSearch &&
        matchFilter
      )
    })

  },[
    assignments,
    search,
    filter
  ])



  /* =========================
     STATS
  ========================= */

  const totalTasks =
  assignments.length



  const completedTasks =
  assignments.filter(
    item => item.completed
  ).length



  const urgentTasks =
  assignments.filter(
    item => item.priority === 'High'
  ).length



  const productivity =

  totalTasks === 0

  ? 0

  : Math.round(

      (
        completedTasks /
        totalTasks
      ) * 100
    )



  const stressLevel =

  urgentTasks >= 5

  ? 'High Stress'

  : urgentTasks >= 3

  ? 'Medium Stress'

  : 'Low Stress'



  /* =========================
     LOADING
  ========================= */

  if(loading){

    return (

      <div className="assignment-loading">

        Loading...

      </div>
    )
  }



  /* =========================
     NO USER
  ========================= */

  if(!user){

    return (

      <div className="assignment-loading">

        Please Login

      </div>
    )
  }



  return (

    <div className="assignments-page">


      {/* HERO */}

      <div className="assignment-hero">


        <div className="assignment-hero-left">


          <div className="assignment-badge">

            🚀 NeuroOrbit Assignment Hub

          </div>



          <h1>

            Smart Assignment Control

          </h1>



          <p>

            Track deadlines,
            productivity,
            focus sessions and
            AI suggestions in
            one intelligent workspace.

          </p>

        </div>



        <div className="assignment-ai-card">


          <h3>

            🤖 AI Suggestion

          </h3>



          <p>

            {
              urgentTasks > 0

              ? 'Complete urgent tasks first.'

              : 'You are doing great.'
            }

          </p>



          <button>

            Generate Study Plan

          </button>

        </div>

      </div>



      {/* SEARCH */}

      <div className="assignment-search-row">


        <div className="assignment-search">


          <FaSearch />


          <input
            type="text"
            placeholder="Search assignments..."
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
          />

        </div>



        <button
          className="add-assignment-btn"
          onClick={addAssignment}
        >

          <FaPlus />

          Add Assignment

        </button>

      </div>



      {/* FILTER */}

      <div className="filter-wrapper">


        {
          [
            'All',
            'Completed',
            'Pending',
            'High',
            'Medium',
            'Low'
          ].map(item => (

            <button

              key={item}

              onClick={()=>
                setFilter(item)
              }

              className={
                filter === item

                ? 'filter-btn active'

                : 'filter-btn'
              }
            >

              {item}

            </button>
          ))
        }

      </div>



      {/* FORM */}

      <div className="assignment-form">


        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e)=>
            setTitle(
              e.target.value
            )
          }
        />



        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e)=>
            setSubject(
              e.target.value
            )
          }
        />



        <input
          type="number"
          placeholder="Study Hours"
          value={hours}
          onChange={(e)=>
            setHours(
              e.target.value
            )
          }
        />



        <select
          value={priority}
          onChange={(e)=>
            setPriority(
              e.target.value
            )
          }
        >

          <option>High</option>
          <option>Medium</option>
          <option>Low</option>

        </select>



        <input
          type="date"
          value={deadline}
          onChange={(e)=>
            setDeadline(
              e.target.value
            )
          }
        />

      </div>



      {/* STATS */}

      <div className="assignment-stats">


        <div className="stat-card">

          <FaCalendarAlt />

          <div>

            <h1>

              {totalTasks}

            </h1>

            <p>

              Total Tasks

            </p>

          </div>

        </div>



        <div className="stat-card">

          <FaCheckCircle />

          <div>

            <h1>

              {completedTasks}

            </h1>

            <p>

              Completed

            </p>

          </div>

        </div>



        <div className="stat-card">

          <FaFire />

          <div>

            <h1>

              {urgentTasks}

            </h1>

            <p>

              Urgent Tasks

            </p>

          </div>

        </div>



        <div className="stat-card">

          <FaChartLine />

          <div>

            <h1>

              {productivity}%

            </h1>

            <p>

              Productivity

            </p>

          </div>

        </div>

      </div>



      {/* MAIN GRID */}

      <div className="assignment-main-grid">


        {/* LEFT */}

        <div>


          <h2 className="section-title">

            Pending Assignments

          </h2>



          {
            filteredAssignments.length === 0

            ? (

              <div className="empty-state">

                <h3>

                  No Assignments Found

                </h3>

                <p>

                  Add your first assignment.

                </p>

              </div>
            )

            : (

              <div className="assignment-list">


                {
                  filteredAssignments.map(item => (

                    <div
                      key={item.id}
                      className="assignment-card"
                    >


                      {/* TOP */}

                      <div className="assignment-card-top">


                        <div>


                          <span
                            className={`priority-badge ${item.priority.toLowerCase()}`}
                          >

                            {item.priority}

                          </span>



                          <h2>

                            {item.title}

                          </h2>

                        </div>



                        <button
                          className="delete-btn"

                          onClick={()=>
                            deleteAssignment(
                              item.id
                            )
                          }
                        >

                          <FaTrash />

                        </button>

                      </div>



                      {/* META */}

                      <div className="assignment-meta">


                        <span>

                          <FaBook />

                          {item.subject}

                        </span>



                        <span>

                          <FaClock />

                          {item.hours} Hours

                        </span>



                        <span>

                          <FaCalendarAlt />

                          {item.deadline}

                        </span>

                      </div>



                      {/* PROGRESS */}

                      <div className="assignment-progress">


                        <div className="assignment-progress-top">


                          <span>

                            Progress

                          </span>



                          <span>

                            {item.progress}%

                          </span>

                        </div>



                        <div className="progress-bar">


                          <div
                            className="progress-fill"

                            style={{
                              width:
                              `${item.progress}%`
                            }}
                          />

                        </div>

                      </div>



                      {/* ACTIONS */}

                      <div className="assignment-actions">


                        <button
                          className="complete-btn"

                          onClick={()=>
                            toggleComplete(
                              item
                            )
                          }
                        >

                          <FaCheckCircle />

                          {
                            item.completed

                            ? 'Completed'

                            : 'Mark Complete'
                          }

                        </button>



                        <button
                          className="complete-btn"

                          onClick={()=>
                            increaseProgress(
                              item
                            )
                          }
                        >

                          <FaBolt />

                          Increase Progress

                        </button>

                      </div>

                    </div>
                  ))
                }

              </div>
            )
          }

        </div>



        {/* RIGHT PANEL */}

        <div className="assignment-side-panel">


          {/* STRESS */}

          <div className="stress-card">


            <h3>

              🧠 Stress Meter

            </h3>



            <p>

              {stressLevel}

            </p>



            <div className="stress-bar">


              <div
                className="stress-fill"

                style={{
                  width:

                  urgentTasks >= 5

                  ? '95%'

                  : urgentTasks >= 3

                  ? '65%'

                  : '30%'
                }}
              />

            </div>

          </div>



          {/* AI */}

          <div className="focus-recommendation">


            <h3>

              ⚡ AI Focus Recommendation

            </h3>



            <p>

              {
                urgentTasks > 2

                ? 'Complete high priority tasks first.'

                : 'Your workload looks manageable.'
              }

            </p>



            <button>

              Start Focus Session

            </button>

          </div>



          {/* KANBAN */}

          <div className="kanban-section">


            <h3>

              📌 Quick Board

            </h3>



            <div className="kanban-grid">


              <div className="kanban-card">

                <h4>

                  Pending

                </h4>

                <span>

                  {
                    assignments.filter(
                      item => !item.completed
                    ).length
                  } Tasks

                </span>

              </div>



              <div className="kanban-card">

                <h4>

                  Completed

                </h4>

                <span>

                  {completedTasks} Tasks

                </span>

              </div>



              <div className="kanban-card">

                <h4>

                  Urgent

                </h4>

                <span>

                  {urgentTasks} Tasks

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Assignments