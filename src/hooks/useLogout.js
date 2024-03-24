import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export const useLogout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = () => {
    localStorage.removeItem('resto-app-token')
    localStorage.removeItem('resto-app-user')
    dispatch({ type: 'set', isAuthenticated: false })
    navigate(`/login`)
    window.location.reload()
  }

  return { logout }
}
