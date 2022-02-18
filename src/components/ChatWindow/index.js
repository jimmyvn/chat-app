import React from 'react'
import Header from './Header'
import MessagesList from './MessagesList'

const ChatWindow = () => {
  return (
    <>
      <div className="header">
        <Header />
      </div >
      <div>
        <MessagesList />
      </div>
    </>
  )
}

export default ChatWindow
