import React from 'react'
import useFirestore from '../hooks/useFirestore'

export const AppContext = React.createContext()

export default function AppProvider({ children }) {

  const [isDisplayAddChannelModal, setIsDisplayAddChannelModal] = React.useState(false)

  const channels = useFirestore('channels')

  return <AppContext.Provider value={{
    isDisplayAddChannelModal,
    setIsDisplayAddChannelModal,
    channels
  }}>
    {children}
  </AppContext.Provider >
}
