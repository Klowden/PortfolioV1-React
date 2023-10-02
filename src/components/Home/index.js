import { Link } from 'react-router-dom'
import devInit from '../../assets/images/dev-int.png'
import './index.scss'
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Logo from './Logo'
import Loader from 'react-loaders'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const firstNameArray = [
    // Using "".split("") elsewhere for same purpose to populate strArray. Not utilizing it here just for proof of concept.
    'h',
    'r',
    'i',
    's',
    't',
    'o',
    'p',
    'h',
    'e',
    'r',
    ' ',
  ]

  const jobArray = [
    // Using "".split("") elsewhere for same purpose to populate strArray. Not utilizing it here just for proof of concept.
    'W',
    'e',
    'b',
    ' ',
    'A',
    'p',
    'p',
    'l',
    'i',
    'c',
    'a',
    't',
    'i',
    'o',
    'n',
    ' ',
  ]

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)

    return () => {
      clearTimeout(timerId)
    }
  }, [])

  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className="word">
              <span className={`${letterClass} _5`}>H</span>
              <span className={`${letterClass} _6`}>i,</span>
            </span>
            <br />
            <span className="word">
              <span className={`${letterClass} _7`}>I</span>
              <span className={`${letterClass} _8`}>'m</span>
            </span>

            <span className="word">
              <img
                className={`${letterClass} _13`}
                src={devInit}
                alt="developer"
              />
              <AnimatedLetters
                letterClass={letterClass}
                strArray={firstNameArray}
                idx={15}
              />
            </span>
            <span className="word">
              <AnimatedLetters
                letterClass={letterClass}
                strArray={'Lowden'.split('')}
                idx={26}
              />
            </span>
            <br />
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={jobArray}
              idx={38}
            />
            <span className="word">
              <AnimatedLetters
                letterClass={letterClass}
                strArray={'Developer'.split('')}
                idx={54}
              />
            </span>
          </h1>
          <h2>Fullstack Developer</h2>
          <Link to="/contact" className="flat-button">
            {' '}
            Contact Me
          </Link>
        </div>
        <Logo />
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Home
