import './index.scss'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { useState, useEffect } from 'react'
import renderPortfolio from './renderPortfolio'
import { getDocs, collection } from 'firebase/firestore/lite'
import { db } from '../../firebase'

const Portfolio = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [portfolio, setPortfolio] = useState([])

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 1500)

    return () => {
      clearTimeout(timerId)
    }
  }, [])

  useEffect(() => {
    getPortfolio()
  }, [])

  const getPortfolio = async () => {
    const querySnapshot = await getDocs(collection(db, 'portfolio'))
    const portfolioData = querySnapshot.docs.map((doc) => doc.data())
    console.log(portfolioData)
    setPortfolio(portfolioData)
  }

  return (
    <>
      <div className="container portfolio-page">
        <h1 className="page-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={'My Portfolio'.split('')}
            idx={15}
          />
        </h1>
        <div>{renderPortfolio(portfolio)}</div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Portfolio
