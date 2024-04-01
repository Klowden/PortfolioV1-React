import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCss3,
  faGitAlt,
  faHtml5,
  faJsSquare,
  faPython,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)

    return () => {
      clearTimeout(timerId)
    }
  }, [])

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={'About Me'.split('')}
              idx={10}
            />
          </h1>
          <p>
            I am a driven and passionate fullstack developer and software
            engineer on the lookout for an exciting opportunity. I'm eager to
            collaborate with cutting-edge technologies and take on diverse
            projects to continually enhance my skills and expertise.
          </p>
          <p>
            Confident in my ability to tackle complex challenges, I bring a
            strong sense of problem-solving and adaptability to any team. With a
            track record of delivering high-quality software solutions, I'm
            ready to contribute effectively from day one.
          </p>
          <p>
            On a personal note, I thrive in dynamic environments where
            innovation and creativity are encouraged. Outside of coding, I'm an
            avid learner, always seeking inspiration from various sources, and I
            believe that a well-rounded life complements a successful career in
            technology.
          </p>
        </div>
        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1">
              <FontAwesomeIcon icon={faPython} color="#3873a3" />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faHtml5} color="#f06529" />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faCss3} color="#28a4d9" />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faReact} color="#5ed4f4" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faJsSquare} color="#efd81d" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faGitAlt} color="#ec4d28" />
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About
