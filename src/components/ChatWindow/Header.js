import React from 'react'
import styled from 'styled-components'
import { Avatar, Tooltip, Button } from 'antd'
import { UserOutlined, AntDesignOutlined, PlusCircleOutlined } from '@ant-design/icons'

const HeaderStyled = styled.div`
  && {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 10px;
    height: 60px;
    align-items: center;
    background: #fff;
    box-shadow: 0px 11px 14px -6px rgba(0,0,0,0.29);
    -webkit-box-shadow: 0px 11px 14px -6px rgba(0,0,0,0.29);
    -moz-box-shadow: 0px 11px 14px -6px rgba(0,0,0,0.29);

    .channel {
      &__name {
        font-weight: bold;
      }

      &__description {
        
      }
    }

    .header {
      &__right {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
  }
`

export default function Header() {
  return (
    <>
      <HeaderStyled>
        <div className="header__left">
          <div className="channel__name">Room 1</div>
          <div className="channel__description">This is the channel description</div>
        </div>
        <div className="header__right">
          <Button type='text' icon={<PlusCircleOutlined />}>Invite</Button>
          <Avatar.Group
            maxCount={4}
            size="large"
            maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
          >
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
            <Tooltip title="Ant User" placement="top">
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            </Tooltip>
            <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
          </Avatar.Group>
        </div>
      </HeaderStyled>
    </>
  )
}
