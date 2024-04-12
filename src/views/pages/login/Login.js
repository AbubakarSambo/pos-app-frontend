import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { login } from '../../../services/login'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginFormData, setLoginFormData] = useState({ phone: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginFormData({ ...loginFormData, [name]: value })
  }

  const handleLogin = () => {
    // 08019283746 - Admin 07077726354 - chef 447746489015 - waiter
    login(loginFormData)
      .then(() => {
        dispatch({ type: 'set', isAuthenticated: true })
        navigate('/profile')
      })
      .catch((error) => {})
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        onChange={handleChange}
                        placeholder="Phone"
                        name="phone"
                        autoComplete="phone"
                        type="text"
                        value={loginFormData.phone}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={loginFormData.password}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
