import { Collapse, Typography } from 'antd'
import { LinkOutlined } from '@ant-design/icons'
import React from 'react'
import styled from 'styled-components'

const { Panel } = Collapse

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header, p {
      padding-bottom: 5px;
      color: #fff;
      font-weight: bold;
    }

    .ant-collapse-content-box {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
`

const TypographyLinkStyled = styled(Typography.Link)`
  &&& {
    color: #fff;
    display: block;
    padding: 5px;
    padding-left: 40px;

    &:hover {
      background-color: #313131;
    }
  }
`

export default function RoomList() {
  return (
    <Collapse ghost defaultActiveKey={['rooms-list']}>
      <PanelStyled header="Channels" key="rooms-list">
        <TypographyLinkStyled className="room-item">
          <LinkOutlined style={{ marginRight: '5px' }} /> Room 1
        </TypographyLinkStyled>
        <TypographyLinkStyled className="room-item">
          <LinkOutlined style={{ marginRight: '5px' }} /> Room 1
        </TypographyLinkStyled>
        <TypographyLinkStyled className="room-item">
          <LinkOutlined style={{ marginRight: '5px' }} /> Room 3
        </TypographyLinkStyled>
      </PanelStyled>
    </Collapse>
  )
}
