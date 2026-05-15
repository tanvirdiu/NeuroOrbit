import {
  useEffect,
  useState
} from 'react'

import {
  FaBrain,
  FaBolt,
  FaClock,
  FaPlay,
  FaPause,
  FaRedoAlt
} from 'react-icons/fa'

function Focus() {

  const [minutes,setMinutes] =
  useState(25)

  const [seconds,setSeconds] =
  useState(0)

  const [isRunning,setIsRunning] =
  useState(false)

  const [customHour,setCustomHour] =
  useState('')

  const [customMinute,setCustomMinute] =
  useState('25')


  useEffect(()=>{

    let timer

    if(isRunning){

      timer = setInterval(()=>{

        if(seconds > 0){

          setSeconds(seconds - 1)
        }

        else{

          if(minutes === 0){

            setIsRunning(false)

            clearInterval(timer)
          }

          else{

            setMinutes(minutes - 1)

            setSeconds(59)
          }
        }

      },1000)
    }

    return ()=> clearInterval(timer)

  },[isRunning,seconds,minutes])


  const handlePreset = (time)=>{

    setMinutes(time)

    setSeconds(0)

    setIsRunning(false)
  }


  const handleApplyCustom = ()=>{

    const totalMinutes =
    Number(customHour) * 60 +
    Number(customMinute)

    if(totalMinutes > 0){

      setMinutes(totalMinutes)

      setSeconds(0)

      setIsRunning(false)
    }
  }


  const handleReset = ()=>{

    setMinutes(25)

    setSeconds(0)

    setIsRunning(false)
  }


  const formatTime = (time)=>{

    return time < 10
    ? `0${time}`
    : time
  }


  return (

    <div className="focus-page">


      {/* HEADER */}

      <div className="focus-header">


        <div>

          <h1>

            Focus Mode 🎯

          </h1>

          <p>

            Eliminate distractions,
            track productivity and
            enter a high performance
            work session.

          </p>

        </div>


        <div className="focus-status">

          Ready To Focus

        </div>

      </div>



      {/* GRID */}

      <div className="focus-grid">


        {/* TIMER */}

        <div className="focus-timer-card">


          <div className="focus-top-bar">

            <div>

              <h2>

                Smart Focus Timer

              </h2>

              <p>

                AI optimized Pomodoro session

              </p>

            </div>


            <div className="focus-live">

              ● LIVE

            </div>

          </div>



          {/* PRESETS */}

          <div className="timer-presets">


            <button
              className="preset-btn"
              onClick={()=>handlePreset(25)}
            >

              25 Min

            </button>


            <button
              className="preset-btn"
              onClick={()=>handlePreset(45)}
            >

              45 Min

            </button>


            <button
              className="preset-btn"
              onClick={()=>handlePreset(60)}
            >

              60 Min

            </button>

          </div>



          {/* CUSTOM */}

          <div className="custom-timer-box">


            <label>

              Set Custom Timer

            </label>


            <div className="custom-inputs">


              <input
                type="number"
                placeholder="Hours"

                value={customHour}

                onChange={(e)=>
                  setCustomHour(
                    e.target.value
                  )
                }
              />


              <input
                type="number"
                placeholder="Minutes"

                value={customMinute}

                onChange={(e)=>
                  setCustomMinute(
                    e.target.value
                  )
                }
              />


              <button
                onClick={handleApplyCustom}
              >

                Apply

              </button>

            </div>

          </div>



          {/* TIMER RING */}

          <div className="timer-ring">


            <div className="timer-ring-inner">

              <h1>

                {formatTime(minutes)}
                :
                {formatTime(seconds)}

              </h1>


              <p>

                Pomodoro Session

              </p>

            </div>

          </div>



          {/* BUTTONS */}

          <div className="focus-controls">


            <button
              className="focus-btn play"

              onClick={()=>
                setIsRunning(true)
              }
            >

              <FaPlay />

            </button>



            <button
              className="focus-btn pause"

              onClick={()=>
                setIsRunning(false)
              }
            >

              <FaPause />

            </button>



            <button
              className="focus-btn reset"

              onClick={handleReset}
            >

              <FaRedoAlt />

            </button>

          </div>

        </div>



        {/* SIDE PANEL */}

        <div className="focus-side-panel">


          <div className="focus-mini-card">

            <FaBrain />

            <div>

              <h3>

                Sessions Today

              </h3>

              <h1>

                4

              </h1>

            </div>

          </div>



          <div className="focus-mini-card">

            <FaBolt />

            <div>

              <h3>

                Productivity

              </h3>

              <h1>

                91%

              </h1>

            </div>

          </div>



          <div className="focus-mini-card">

            <FaClock />

            <div>

              <h3>

                Distractions

              </h3>

              <h1>

                2

              </h1>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Focus