import React from 'react'
import { Button, Col, Row } from 'antd'
import Sidebar from '../Sidebar'
import ChatWindow from '../ChatWindow'

const ChatRoom = () => {

  return (
    <Row>
      <Col className="sidebar" span={7}>
        <Sidebar />
      </Col>
      <Col className="chat-window-content" span={17}>
        <ChatWindow />
      </Col>
    </Row>
  )
}

export default ChatRoom
