import { Empty, Form, Input } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { addDocument } from '../../configs/FirebaseService'
import { AppContext } from '../../context/AppProvider'
import { AuthContext } from '../../context/AuthProvider'
import useFirestore from '../../hooks/useFirestore'
import Message from './Message'

const ContentStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`

const InputMessageStyled = styled(Input.TextArea)`
  background: #002530;
  color: #c2cbd3;
  border-color: #135c6f;
  box-shadow: none;

  &:hover {
    border-color: #12586a;
    box-shadow: none;
  }

  &:focus {
    border-color: #12586a;
    box-shadow: none;
  }
`

export default function MessagesList() {

  const [form] = Form.useForm()
  const messageListRef = React.useRef(null)
  const inputRef = React.useRef(null)

  const { channelSelected } = React.useContext(AppContext)
  const { user: {
    uid, displayName, photoURL
  } } = React.useContext(AuthContext)

  const handleSubmitMessage = () => {
    const formData = form.getFieldsValue()
    addDocument('channel_messages', {
      channelId: channelSelected.id,
      userId: uid,
      name: displayName,
      photoURL: photoURL,
      content: formData.message
    })

    form.resetFields()

    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus()
      });
    }
  }

  const channelMessageCondition = React.useMemo(() => {
    return {
      field: 'channelId',
      operator: '==',
      value: channelSelected.id
    }
  }, [channelSelected.id])
  const messages = useFirestore('channel_messages', channelMessageCondition)

  React.useEffect(() => {
    // scroll to bottom after `messages` changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 50
    }
  }, [messages])

  return (
    <>
      {
        messages.length > 0 ?
          <ContentStyled ref={messageListRef}>
            {
              messages.map((message) => {
                let isBelongsToCurrentUser = false
                if (message.userId === uid) {
                  isBelongsToCurrentUser = true
                }
                return <Message
                  key={message.id}
                  photoURL={message.photoURL}
                  name={message.name}
                  content={message.content}
                  createdAt={message.createdAt}
                  own={isBelongsToCurrentUser}
                />
              })
            }
          </ContentStyled>
          :
          <div className="chat-window-empty-channel">
            <Empty description="No messages has found" style={{ color: '#c2cbd3' }} />
          </div>
      }
      <Form
        form={form}
      >
        <Form.Item name="message">
          <InputMessageStyled
            ref={inputRef}
            autoComplete="off"
            className="input-message"
            placeholder="Enter message..."
            onPressEnter={handleSubmitMessage}
          />
        </Form.Item>
      </Form>
    </>
  )
}
