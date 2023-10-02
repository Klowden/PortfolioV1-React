// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCA_EtaiGKUJFuOuv09Wch_xiWjbUCan7Y',
  authDomain: 'react-portfolio-dashboar-73ad5.firebaseapp.com',
  projectId: 'react-portfolio-dashboar-73ad5',
  storageBucket: 'react-portfolio-dashboar-73ad5.appspot.com',
  messagingSenderId: '384498161382',
  appId: '1:384498161382:web:dcd20295b8d6e21d248d27',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()
const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)

export const signInWithGoogle = () => signInWithPopup(auth, provider)
