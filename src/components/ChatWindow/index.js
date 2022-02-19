import { Empty } from 'antd'
import React from 'react'
import { AppContext } from '../../context/AppProvider'
import Header from './Header'
import MessagesList from './MessagesList'

const ChatWindow = () => {
  const { idChannelSelected } = React.useContext(AppContext)
  return (
    <>
      {
        idChannelSelected !== undefined
          ?
          <div>
            <div className="header">
              <Header />
            </div >
            <div>
              <MessagesList />
            </div>
          </div>
          :
          <div className="chat-window-empty-channel">
            <Empty description="Please select the channel" />
          </div>
      }
    </>
  )
}

export default ChatWindow
