import { useRef, useState } from 'react'
import { auth, db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore/lite'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const form = useRef()
  const navigate = useNavigate()
  const [signingOut, setSigningOut] = useState(false) // Flag to track sign-out

  const submitPortfolio = (e) => {
    e.preventDefault()

    // Check if signing out; if so, return early
    if (signingOut) {
      return
    }

    const name = form.current[0]?.value
    const description = form.current[1]?.value
    const url = form.current[2]?.value
    const image = form.current[3]?.files[0]
    if (!name || !url) {
      // Handle the case where name or url is not provided.
      alert('Name and URL are required.')
      return
    }

    const storageRef = ref(storage, `portfolio/${image.name}`)

    uploadBytes(storageRef, image).then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then(
          (downloadUrl) => {
            savePortfolio({
              name,
              description,
              url,
              image: downloadUrl,
            })
          },
          (error) => {
            console.log(error)
            savePortfolio({
              name,
              description,
              url,
              image: null,
            })
          }
        )
      },
      (error) => {
        console.log(error)
        savePortfolio({
          name,
          description,
          url,
          image: null,
        })
      }
    )
  }

  const savePortfolio = async (portfolio) => {
    try {
      await addDoc(collection(db, 'portfolio'), portfolio)
      window.location.reload(false)
    } catch (error) {
      alert('Failed to add to Database')
    }
  }

  const handleSignOut = () => {
    setSigningOut(true) // Set the flag to true when signing out
    auth.signOut().then(() => {
      // Redirect to homepage after signing out
      navigate('/')
    })
  }

  return (
    <div className="dashboard">
      <form ref={form} onSubmit={submitPortfolio}>
        <p>
          <input type="text" placeholder="Name" />
        </p>
        <p>
          <textarea placeholder="Description" />
        </p>
        <p>
          <input type="text" placeholder="Url" />
        </p>
        <p>
          <input type="file" placeholder="Image" />
        </p>
        <button type="submit">Submit</button>
        <button onClick={handleSignOut}>Sign Out</button>
      </form>
    </div>
  )
}

export default Home
