import api from '../../../services/api'

export const updateUser = async (data) => {
  return await api.patch(`/users/${data.id}`, data)
}
export const saveUser = async (data) => {
  return await api.post('/users', data)
}
export const deleteUser = async (id) => {
  return await api.delete(`/users/${id}`)
}
