import React from 'react'

const Home = React.lazy(() => import('./views/home/Home'))
const Menu = React.lazy(() => import('./views/menu/MenuPage'))
const Order = React.lazy(() => import('./views/order/Order'))

const routes = [
  { path: '/home', name: 'Home', element: Home },
  { path: '/menu', name: 'Menu', element: Menu },
  { path: '/orders', name: 'Orders', element: Order },
]

export default routes
