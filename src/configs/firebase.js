import { initializeApp } from "firebase/app"
import { getFirestore, connectFirestoreEmulator } from "@firebase/firestore"
import { getAuth, connectAuthEmulator } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC8GDNhH9NkRnH_t24MBs3H0R6QvVq1coE",
  authDomain: "chat-app-15dbe.firebaseapp.com",
  projectId: "chat-app-15dbe",
  storageBucket: "chat-app-15dbe.appspot.com",
  messagingSenderId: "582253131844",
  appId: "1:582253131844:web:973e81bc93da4a3e8a2411",
  measurementId: "G-F47BQ9EELY"
}


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, "http://localhost:9099")
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export { auth, db }
