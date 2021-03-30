import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="mail">
        <a href="/subscription">내 구독 페이지</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu