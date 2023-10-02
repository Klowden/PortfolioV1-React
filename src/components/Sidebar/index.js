import { Link, NavLink } from 'react-router-dom'
import './index.scss'
import LogoC from '../../assets/images/dev-int.png'
import LogoSubtitle from '../../assets/images/dev-name.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faHome,
  faSuitcase,
  faUser,
  faClose,
  faBars,
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'

const Sidebar = () => {
  const [showNav, setShowNav] = useState(false)

  return (
    <div className="nav-bar">
      <Link className="logo" to="/" onClick={() => setShowNav(false)}>
        <img src={LogoC} alt="logo" />
        <img className="sub-logo" src={LogoSubtitle} alt="Christopher Lowden" />
      </Link>
      <nav className={showNav ? 'mobile-show' : ''}>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
        </NavLink>

        <NavLink
          activeclassname="active"
          className="about-link"
          to="/about"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
        </NavLink>

        <NavLink
          activeclassname="active"
          className="portfolio-link"
          to="/portfolio"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faSuitcase} color="#4d4d4e" />
        </NavLink>

        <NavLink
          activeclassname="active"
          className="contact-link"
          to="/contact"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
        </NavLink>

        <FontAwesomeIcon
          onClick={() => setShowNav(false)}
          icon={faClose}
          size="3x"
          className="close-icon"
        />
      </nav>
      <ul>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/christopher-lowden-a40ba8140/"
          >
            <FontAwesomeIcon icon={faLinkedin} color="4d4d4e" />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.youtube.com/@KreesLowden"
          >
            <FontAwesomeIcon icon={faYoutube} color="4d4d4e" />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.facebook.com/KristopherLowden"
          >
            <FontAwesomeIcon icon={faFacebook} color="4d4d4e" />
          </a>
        </li>
        <li>
          <a target="_blank" rel="noreferrer" href="https://github.com/Klowden">
            <FontAwesomeIcon icon={faGithub} color="4d4d4e" />
          </a>
        </li>
      </ul>
      <FontAwesomeIcon
        onClick={() => setShowNav(true)}
        icon={faBars}
        color="#ffd700"
        size="3x"
        className="hamburger-icon"
      />
    </div>
  )
}

export default Sidebar
