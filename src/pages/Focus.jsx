import {
  useEffect,
  useRef,
  useState
}
from 'react'

import {
  FaBrain,
  FaBolt,
  FaClock,
  FaPlay,
  FaPause,
  FaRedoAlt,
  FaVolumeUp,
  FaMusic,
  FaHeadphones
}
from 'react-icons/fa'

import rainSound
from '../assets/audio/rain.mp3'

import lofiSound
from '../assets/audio/lofi.mp3'

import codingSound
from '../assets/audio/coding.mp3'

import nightSound
from '../assets/audio/night.mp3'



function Focus() {



  /* ================= TIMER ================= */

  const [minutes,setMinutes] =
  useState(25)

  const [seconds,setSeconds] =
  useState(0)

  const [isRunning,setIsRunning] =
  useState(false)



  /* ================= CUSTOM TIMER ================= */

  const [customHour,setCustomHour] =
  useState('')

  const [customMinute,setCustomMinute] =
  useState('25')



  /* ================= MUSIC ================= */

  const [currentTrack,setCurrentTrack] =
  useState(null)

  const [isMusicPlaying,setIsMusicPlaying] =
  useState(false)

  const [volume,setVolume] =
  useState(0.5)



  const audioRef =
  useRef(null)



  /* ================= TRACKS ================= */

  const tracks = [

    {

      id:1,

      title:'Rain Focus',

      icon:'🌧',

      audio:rainSound
    },

    {

      id:2,

      title:'Lo-Fi Beats',

      icon:'🎧',

      audio:lofiSound
    },

    {

      id:3,

      title:'Deep Coding',

      icon:'🔥',

      audio:codingSound
    },

    {

      id:4,

      title:'Night Flow',

      icon:'🌙',

      audio:nightSound
    }
  ]



  /* ================= TIMER ================= */

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



  /* ================= AUDIO VOLUME ================= */

  useEffect(()=>{

    if(audioRef.current){

      audioRef.current.volume =
      volume
    }

  },[volume])



  /* ================= PRESET ================= */

  const handlePreset = (time)=>{

    setMinutes(time)

    setSeconds(0)

    setIsRunning(false)
  }



  /* ================= CUSTOM ================= */

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



  /* ================= RESET ================= */

  const handleReset = ()=>{

    setMinutes(25)

    setSeconds(0)

    setIsRunning(false)
  }



  /* ================= FORMAT ================= */

  const formatTime = (time)=>{

    return time < 10

    ?

    `0${time}`

    :

    time
  }



  /* ================= PLAY MUSIC ================= */

  const handleMusic = (track)=>{

    if(
      currentTrack?.id === track.id
      &&
      isMusicPlaying
    ){

      audioRef.current.pause()

      setIsMusicPlaying(false)

      return
    }



    if(audioRef.current){

      audioRef.current.pause()
    }



    audioRef.current =
    new Audio(track.audio)



    audioRef.current.volume =
    volume



    audioRef.current.loop =
    true



    audioRef.current.play()



    setCurrentTrack(track)

    setIsMusicPlaying(true)
  }



  return (

    <div className="focus-page">



      {/* ================= HEADER ================= */}

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

          Deep Work Active

        </div>

      </div>



      {/* ================= GRID ================= */}

      <div className="focus-grid">



        {/* ================= TIMER ================= */}

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



          {/* ================= PRESETS ================= */}

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



          {/* ================= CUSTOM ================= */}

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



          {/* ================= TIMER RING ================= */}

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



          {/* ================= BUTTONS ================= */}

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



        {/* ================= SIDE PANEL ================= */}

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



      {/* ================= MUSIC SECTION ================= */}

      <section className="focus-music-section">



        <div className="music-header">



          <div>



            <h2>

              <FaMusic />

              Focus Sound Environment

            </h2>



            <p>

              AI selected ambient sounds
              designed for deep work sessions.

            </p>

          </div>



          <div className="music-volume">



            <FaVolumeUp />



            <input
              type="range"
              min="0"
              max="1"
              step="0.1"

              value={volume}

              onChange={(e)=>
                setVolume(
                  e.target.value
                )
              }
            />

          </div>

        </div>



        {/* ================= MUSIC GRID ================= */}

        <div className="music-grid">



          {
            tracks.map((track)=>(

              <div
                className={

                  currentTrack?.id === track.id

                  ?

                  'music-card active'

                  :

                  'music-card'
                }

                key={track.id}
              >



                <div className="music-card-top">



                  <div className="music-icon">

                    {track.icon}

                  </div>



                  <div>



                    <h3>

                      {track.title}

                    </h3>



                    <p>

                      Deep Focus Audio

                    </p>

                  </div>

                </div>



                <button

                  className="music-play-btn"

                  onClick={()=>
                    handleMusic(track)
                  }
                >

                  {
                    currentTrack?.id === track.id
                    &&
                    isMusicPlaying

                    ?

                    <>

                      <FaPause />

                      Pause
                    </>

                    :

                    <>

                      <FaPlay />

                      Play
                    </>
                  }

                </button>

              </div>
            ))
          }

        </div>



        {/* ================= NOW PLAYING ================= */}

        {
          currentTrack && (

            <div className="now-playing">



              <div className="now-left">



                <FaHeadphones />



                <div>



                  <h3>

                    Now Playing

                  </h3>



                  <p>

                    {
                      currentTrack.title
                    }

                  </p>

                </div>

              </div>



              <div className="wave-animation">



                <span></span>
                <span></span>
                <span></span>
                <span></span>

              </div>

            </div>
          )
        }

      </section>

    </div>
  )
}

export default Focus