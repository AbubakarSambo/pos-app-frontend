import api from '../../../services/api'

export const getProfile = async (id) => {
  return await api.get(`/users/${id}`)
}

export const updateUser = async (data) => {
  return await api.patch(`/users/${data.id}`, data)
}

export const resetPassword = async (data) => {
  return await api.post(`/users/reset-password/${data.id}`, data)
}
