import api from '../../../services/api'

export const updateCustomer = async (data) => {
  return await api.patch(`/customers/${data.id}`, data)
}
export const saveCustomer = async (data) => {
  return await api.post('/customers', data)
}
export const deleteCustomer = async (id) => {
  return await api.delete(`/customers/${id}`)
}
