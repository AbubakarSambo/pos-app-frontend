import React from 'react'

const Home = React.lazy(() => import('./views/home/Home'))
const Menu = React.lazy(() => import('./views/menu/MenuPage'))
const Order = React.lazy(() => import('./views/order/Order'))
const Category = React.lazy(() => import('./views/category/Category'))
const Customer = React.lazy(() => import('./views/customer/Customer'))
const User = React.lazy(() => import('./views/user/User'))
const Profile = React.lazy(() => import('./views/profile/Profile'))

const routes = [
  { path: '/home', name: 'Home', element: Home, roles: ['Admin'] },
  { path: '/menu', name: 'Menu', element: Menu, roles: ['Admin', 'Chef', 'Waiter'] },
  { path: '/orders', name: 'Orders', element: Order, roles: ['Admin', 'Waiter'] },
  { path: '/categories', name: 'Categories', element: Category, roles: ['Admin', 'Chef'] },
  { path: '/customers', name: 'Customers', element: Customer, roles: ['Admin', 'Waiter'] },
  { path: '/users', name: 'Customers', element: User, roles: ['Admin', 'Waiter'] },
  { path: '/profile', name: 'Profile', element: Profile, roles: ['Admin', 'Waiter', 'Chef'] },
]

export default routes
