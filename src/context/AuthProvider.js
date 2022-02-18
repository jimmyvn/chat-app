import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../configs/firebase';

export const AuthContext = React.createContext()

export default function AuthProvider({ children }) {

  const [user, setUser] = React.useState({})
  const navigate = useNavigate()

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const {
          displayName, email, uid, photoURL
        } = user
        setUser({
          displayName, email, uid, photoURL
        })

        navigate('/')
        return
      }

      navigate('/login')
    })

    return () => {
      unsubscribe()
    }
  }, [navigate])

  return (
    <AuthContext.Provider
      value={{ user }}
    >
      {children}
    </AuthContext.Provider>
  )
}
