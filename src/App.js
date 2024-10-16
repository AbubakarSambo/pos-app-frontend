import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './rbc.css'

import { useIsAuthenticated } from './hooks/useIsAuthenticated'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  const isAuthenticated = useIsAuthenticated()
  useEffect(() => {
    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          {isAuthenticated ? (
            <Route path="*" name="Home" element={<DefaultLayout />} />
          ) : (
            <>
              <Route exact path="/login" name="Login Page" element={<Login />} />
              <Route exact path="/register" name="Register Page" element={<Register />} />
            </>
          )}

          {/* <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
