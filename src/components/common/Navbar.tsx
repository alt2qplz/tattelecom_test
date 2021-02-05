import React from 'react'
import { Menu } from 'antd'
import { UserOutlined, ContainerOutlined, CameraOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

export const Navigation = () => {
  return (
    <Menu mode="horizontal" style={{ marginBottom: '1.5rem' }}>
      <Menu.Item key="users" icon={<UserOutlined/>}>
        <NavLink to='/users'>
          USERS
        </NavLink>
      </Menu.Item>
      <Menu.Item key="posts" icon={<ContainerOutlined/>}>
        <NavLink to='/posts'>
          POSTS
        </NavLink>
      </Menu.Item>
      <Menu.Item key="albums" icon={<CameraOutlined/>}>
        <NavLink to='/albums'>
          ALBUMS
        </NavLink>
      </Menu.Item>
    </Menu>
  )
}
