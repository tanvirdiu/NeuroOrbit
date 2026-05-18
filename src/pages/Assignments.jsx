import '../styles/Assignments.css'

import {
  useState,
  useEffect,
  useMemo
}
from 'react'

import {
  useNavigate
}
from 'react-router-dom'

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where
}
from 'firebase/firestore'

import {
  onAuthStateChanged
}
from 'firebase/auth'

import {
  auth,
  db
}
from '../firebase/firebase'

import {

  FaPlus,
  FaSearch,
  FaTrash,
  FaClock,
  FaBook,
  FaCalendarAlt

}
from 'react-icons/fa'



function Assignments(){



  /* =========================
     NAVIGATE
  ========================= */

  const navigate =
  useNavigate()



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
     AUTH
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
     REALTIME FETCH
  ========================= */

  useEffect(()=>{

    if(!user){

      return
    }



    const q = query(

      collection(
        db,
        'assignments'
      ),

      where(
        'uid',
        '==',
        user.uid
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

      alert(
        'Please fill all fields'
      )

      return
    }



    try{

      await addDoc(

        collection(
          db,
          'assignments'
        ),

        {

          uid:user.uid,

          title,

          subject,

          hours:Number(hours),

          priority,

          deadline,

          focusedMinutes:0,

          completed:false,

          createdAt:
          Date.now()
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

      alert(
        'Failed to add assignment'
      )
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
     START FOCUS
  ========================= */

  const startFocus =
  (item)=>{

    navigate(

      '/focus',

      {

        state:{
          assignment:item
        }
      }
    )
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
     LOADING
  ========================= */

  if(loading){

    return(

      <div className="assignments-page">

        Loading...

      </div>
    )
  }



  return(

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
            AI suggestions in one intelligent workspace.

          </p>

        </div>



        <div className="assignment-ai-card">


          <h3>

            🤖 AI Suggestion

          </h3>



          <p>

            Complete urgent tasks first.

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

              className={
                filter === item

                ? 'filter-btn active'

                : 'filter-btn'
              }

              onClick={()=>
                setFilter(item)
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



        <button
          className="add-assignment-btn"
          onClick={addAssignment}
        >

          <FaPlus />

          Add Assignment

        </button>

      </div>



      {/* ASSIGNMENTS */}

      <div className="assignment-list">


        {
          filteredAssignments.length === 0

          ? (

            <div className="empty-state">

              <h3>

                No Assignments Yet

              </h3>

              <p>

                Add your first assignment.

              </p>

            </div>
          )

          : (

            filteredAssignments.map(item => {



              const currentMinutes =

                item.focusedMinutes ??
                0



              const progress =

                Math.min(

                  (
                    currentMinutes /
                    ((item.hours || 1) * 60)
                  ) * 100,

                  100
                )



              return(

                <div
                  key={item.id}
                  className="assignment-card"
                >


                  <div className="assignment-card-top">


                    <div>

                      <h2>

                        {item.title}

                      </h2>

                    </div>



                    <span
                      className={`priority-badge ${item.priority.toLowerCase()}`}
                    >

                      {item.priority}

                    </span>

                  </div>



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



                  <div className="assignment-progress">


                    <div className="assignment-progress-top">

                      <span>

                        Progress

                      </span>



                      <span>

                        {
                          Math.round(progress)
                        }%

                      </span>

                    </div>



                    <div className="progress-bar">

                      <div
                        className="progress-fill"
                        style={{
                          width:`${progress}%`
                        }}
                      />

                    </div>

                  </div>



                  <div className="assignment-actions">


                    <button
                      className="complete-btn"

                      onClick={()=>
                        startFocus(item)
                      }
                    >

                      Start Focus

                    </button>



                    <button
                      className="delete-btn"
                      onClick={()=>
                        deleteAssignment(item.id)
                      }
                    >

                      <FaTrash />

                    </button>

                  </div>

                </div>
              )
            })
          )
        }

      </div>

    </div>
  )
}

export default Assignments