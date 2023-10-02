import './index.scss'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { useEffect, useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const refForm = useRef()

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 1500)

    return () => {
      clearTimeout(timerId)
    }
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'service_2t96ywy',
        'template_2u2wnwh',
        refForm.current,
        'nHMxbwuMQpLlf3C6d'
      )
      .then(
        () => {
          alert('Message successfully sent!')
          window.location.reload(false)
        },
        () => {
          alert(
            'Failed to send message, please try again or reach out by other means.'
          )
        }
      )
  }

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={'Contact Me'.split('')}
              idx={10}
            />
          </h1>
          <p>
            I'm interested in job and freelancing opportunities - especially on
            ambitious or larger projects. Please contact me is you have any
            requests or questions either through my given information or the
            through using the form below.
          </p>
          <div className="contact-form">
            <form ref={refForm} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input type="text" name="name" placeholder="Name" required />
                </li>
                <li className="half">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </li>
                <li>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div className="info-map">
          Christopher Lowden,
          <br />
          United States,
          <br />
          Vienna, WV
          <br />
          <span>klowdensolutions@gmail.com</span>
        </div>
        <div className="map-wrap">
          <MapContainer center={[39.327, -81.5485]} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[39.327, -81.5485]}>
              <Popup>Work is done remotely, meetings are done via web.</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Contact
