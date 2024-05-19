import api from '../../../services/api'

export const updateOrder = async (data, id) => {
  return await api.patch(`/orders/${id}`, data)
}
