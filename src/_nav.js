import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilHome, cilMenu, cilTablet } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    roles: [2, 3, 4],
  },
  {
    component: CNavItem,
    name: 'Menu',
    to: '/menu',
    icon: <CIcon icon={cilMenu} customClassName="nav-icon" />,
    roles: [3],
  },
  {
    component: CNavItem,
    name: 'Orders',
    to: '/orders',
    icon: <CIcon icon={cilTablet} customClassName="nav-icon" />,
    roles: [2],
  },
]

export default _nav
