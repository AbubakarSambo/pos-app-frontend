import api from '../../../services/api'

export const updateBooking = async (data) => {
  return await api.patch(`/bookings/${data.id}`, data)
}
export const saveBooking = async (data) => {
  return await api.post('/bookings', data)
}
export const deleteBooking = async (id) => {
  return await api.delete(`/bookings/${id}`)
}
