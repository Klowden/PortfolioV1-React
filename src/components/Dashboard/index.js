import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import Login from '../Login'
import Home from './home'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Check the user's email
        if (user.email === 'clowden4@gmail.com') {
          setUser(user) // Allow access
        } else {
          setUser(null) // Deny access
        }
      } else {
        setUser(null)
      }
    })
  }, [auth])

  return <div className="dashboard">{user ? <Home /> : <Login />}</div>
}

export default Dashboard
