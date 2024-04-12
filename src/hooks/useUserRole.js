export const useUserRole = () => {
  const user = JSON.parse(localStorage.getItem('resto-app-user')) || {}
  return user.role
}

export const useUserOrg = () => {
  const user = JSON.parse(localStorage.getItem('resto-app-user')) || {}
  return user.orgId
}

export const useUserId = () => {
  const user = JSON.parse(localStorage.getItem('resto-app-user')) || {}
  return user.id
}
