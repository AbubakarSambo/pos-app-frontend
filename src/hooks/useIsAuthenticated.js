import { useSelector } from 'react-redux'

export const useIsAuthenticated = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated)

  return Boolean(localStorage.getItem('resto-app-token')) || isAuthenticated
}
