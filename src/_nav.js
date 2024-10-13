import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilAlbum, cilFace, cilHome, cilMenu, cilPeople, cilTablet, cilUser } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    roles: ['Admin'],
  },
  {
    component: CNavItem,
    name: 'Menu',
    to: '/menu',
    icon: <CIcon icon={cilMenu} customClassName="nav-icon" />,
    roles: ['Admin', 'Chef', 'Waiter'],
  },
  {
    component: CNavItem,
    name: 'Orders',
    to: '/orders',
    icon: <CIcon icon={cilTablet} customClassName="nav-icon" />,
    roles: ['Admin', 'Waiter'],
  },
  {
    component: CNavItem,
    name: 'Categories',
    to: '/categories',
    icon: <CIcon icon={cilAlbum} customClassName="nav-icon" />,
    roles: ['Admin', 'Chef'],
  },
  {
    component: CNavItem,
    name: 'Customers',
    to: '/customers',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    roles: ['Admin', 'Waiter'],
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    roles: ['Admin', 'Waiter'],
  },
  {
    component: CNavItem,
    name: 'Calendar',
    to: '/calendar',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    roles: ['Admin'],
  },
  {
    component: CNavItem,
    name: 'Profile',
    to: '/profile',
    icon: <CIcon icon={cilFace} customClassName="nav-icon" />,
    roles: ['Admin', 'Waiter', 'Chef'],
  },
]

export default _nav
