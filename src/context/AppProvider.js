import React from 'react'
import useFirestore from '../hooks/useFirestore'
import { AuthContext } from './AuthProvider'

export const AppContext = React.createContext()

export default function AppProvider({ children }) {

  const [isDisplayAddChannelModal, setIsDisplayAddChannelModal] = React.useState(false)
  const [isDisplayInviteMemberModal, setIsDisplayInviteMemberModal] = React.useState(false)
  const [idChannelSelected, setIdChannelSelected] = React.useState(undefined)

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

  const channelSelected = React.useMemo(() => {
    return channels.find(channel => {
      return channel.id === idChannelSelected
    }) || {}
  }, [channels, idChannelSelected])

  const membersCondition = React.useMemo(() => {
    return {
      field: 'uid',
      operator: 'in',
      value: channelSelected.members
    }
  }, [channelSelected.members])

  const channelMembers = useFirestore('users', membersCondition)

  return <AppContext.Provider value={{
    isDisplayAddChannelModal,
    setIsDisplayAddChannelModal,
    isDisplayInviteMemberModal,
    setIsDisplayInviteMemberModal,
    channels,
    idChannelSelected,
    setIdChannelSelected,
    channelSelected,
    channelMembers
  }}>
    {children}
  </AppContext.Provider >
}
