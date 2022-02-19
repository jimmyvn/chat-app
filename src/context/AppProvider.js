import React from 'react'
import useFirestore from '../hooks/useFirestore'
import { AuthContext } from './AuthProvider'

export const AppContext = React.createContext()

export default function AppProvider({ children }) {

  const [isDisplayAddChannelModal, setIsDisplayAddChannelModal] = React.useState(false)
  const [idChannelSelected, setIsChannelSelected] = React.useState(undefined)

  const { user: {
    uid
  } } = React.useContext(AuthContext)

  const channelsCondition = React.useMemo(() => {
    return {
      field: 'members',
      operator: 'array-contains',
      value: uid
    }
  }, [uid])

  const channels = useFirestore('channels', channelsCondition)

  return <AppContext.Provider value={{
    isDisplayAddChannelModal,
    setIsDisplayAddChannelModal,
    channels,
    idChannelSelected,
    setIsChannelSelected
  }}>
    {children}
  </AppContext.Provider >
}
