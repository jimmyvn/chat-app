import React from 'react'
import { Avatar, Button, Typography } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { auth, db } from '../../configs/firebase'
import styled from 'styled-components'
import { AuthContext } from '../../context/AuthProvider'
import useFirestore from '../../hooks/useFirestore'
import { collection, getDocs, query, where } from '@firebase/firestore'

const WrapperUserInfoStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #424242;

  .username {
    color: #fff;
    margin-left: 5px;
  }
`

export default function UserInfo() {
  const { user: {
    displayName, photoURL, uid
  } } = React.useContext(AuthContext)

  return (
    <WrapperUserInfoStyled>
      <div className="user__information">
        <Avatar className="avatar" src={photoURL ? photoURL : ''}>
          {photoURL ? '' : displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className="username">{displayName}</Typography.Text>
      </div>
      <Button
        type='ghost'
        style={{ color: '#fff' }}
        onClick={() => auth.signOut()}
        icon={<LogoutOutlined />}
      >
        Sign Out
      </Button>
    </WrapperUserInfoStyled >
  )
}
