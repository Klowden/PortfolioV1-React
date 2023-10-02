import { useEffect, useState, useRef } from 'react'

// create color array for variance in color
const colorArray = [
  'rgba(71, 7, 247, 1)',
  'rgba(6, 6, 212, 1)',
  'rgba(19, 76, 235, 1)',
  'rgba(6, 112, 212, 1)',
  'rgba(0, 192, 245, 1)',
]

//set max circle radius for function
const maxRadius = Math.min(window.innerWidth, window.innerHeight) / 1.2

//declare circle class (template function that populates the circle array)
class Circle {
  constructor(x, y, lineWidth, strokeColor, radius) {
    //declare variables unique to each circle
    this.x = x
    this.y = y
    this.radius = radius
    this.lineWidth = lineWidth
    this.strokeColor = strokeColor
  }

  draw(c) {
    //arc / circle
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    //color array to set each stroke to its own color
    c.strokeStyle = this.strokeColor
    c.stroke()
  }

  update(c, isScrolling, scrollDeltaX, scrollDeltaY, circleArray) {
    //reduce the alpha value of the stroke color to simulate dissipation
    let newAlpha = this.strokeColor.substring(
      this.strokeColor.lastIndexOf(',') + 1,
      this.strokeColor.lastIndexOf(')')
    )
    newAlpha -= 0.0017
    newAlpha = Math.max(0, newAlpha)

    //replace the old alpha with the newAlpha manually from the rgba value
    this.strokeColor = this.strokeColor.replace(/[^,]+(?=\))/, newAlpha)

    //set the stroke style with the updated strokeColor
    c.strokeStyle = this.strokeColor

    //decrease the lineWidth gradually for a dissipation effect
    this.lineWidth = Math.max(this.lineWidth - 0.008, 3)

    //set lineWidth for draw() function
    c.lineWidth = this.lineWidth

    //growth of circles
    if (this.radius < maxRadius) {
      this.radius += 1
    }

    //check if alpha from rgba has reached 0 or maxRadius reached
    if (newAlpha <= 0 || this.radius >= maxRadius) {
      //if true, remove the circle from the circleArray
      const indexToRemove = circleArray.indexOf(this)
      if (indexToRemove !== -1) {
        circleArray.splice(indexToRemove, 1)
      }
      //exit the update function
      return
    }

    //check for a scroll event
    if (isScrolling) {
      //update the circle's x and y positions by the exact changes in x and y during the scroll event
      this.x -= scrollDeltaX
      this.y -= scrollDeltaY
    }

    //call draw()
    this.draw(c)
  }
}

const Canvas = () => {
  //declare the canvasRef
  const canvasRef = useRef(null)

  //create circle array to store multiple circles
  const [circleArray, setCircleArray] = useState([])

  //declare const to determine if scrolling (initially false)
  const [isScrolling, setIsScrolling] = useState(false)

  //declare initial delta values (velocity on scroll)
  const [scrollDeltas, setScrollDeltas] = useState({ x: 0, y: 0 })

  //declare initial scroll values
  const [initialScroll, setInitialScroll] = useState({
    x: window.scrollX,
    y: window.scrollY,
  })

  //ref to keep track of animation loop
  const animationActiveRef = useRef(false)

  //declare scrollTimeout for use in handleScroll function
  const scrollTimeout = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // function for use by Event Listener - canvas click
    const handleMouseDown = (event) => {
      const x = event.x
      const y = event.y
      const radius = Math.random() * 3 + 3
      const lineWidth = Math.random() * 16 + 4
      const strokeColor =
        colorArray[Math.floor(Math.random() * colorArray.length)]
      const newCircle = new Circle(x, y, lineWidth, strokeColor, radius)
      setCircleArray((prevCircles) => prevCircles.concat(newCircle))
    }

    const handleResize = () => {
      const canvas = canvasRef.current
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleScroll = () => {
      const scrollYDelta = window.scrollY - initialScroll.y
      const scrollXDelta = window.scrollX - initialScroll.x
      setScrollDeltas({ x: scrollXDelta, y: scrollYDelta })

      //update the initialScroll after setting delta values
      setInitialScroll({ x: window.scrollX, y: window.scrollY })

      setIsScrolling(true)

      // Use a timeout to set the isScrolling flag back to false after a short delay
      clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 25)
    }

    document.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [initialScroll])

  useEffect(() => {
    const canvas = canvasRef.current
    const c = canvas.getContext('2d')

    const animate = () => {
      //create Loop
      if (!animationActiveRef.current) {
        return //exit if animation not active
      }
      //create loop
      requestAnimationFrame(animate)

      //clear canvas
      c.clearRect(0, 0, window.innerWidth, window.innerHeight)

      //circle update function - draws circle each frame
      for (let i = 0; i < circleArray.length; i++) {
        // Pass the required arguments to the update method here
        circleArray[i].update(
          c,
          isScrolling,
          scrollDeltas.x,
          scrollDeltas.y,
          circleArray
        )
      }
    }
    if (!animationActiveRef.current) {
      animationActiveRef.current = true // Mark the animation as active
      animate()
    }

    return () => {
      animationActiveRef.current = false // Mark the animation as not active when unmounting
    }
  }, [circleArray, isScrolling, scrollDeltas])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        display: 'block',
        pointerEvents: 'all',
        mixBlendMode: 'screen',
        zIndex: -1,
      }}
    />
  )
}

export default Canvas
