import api from '../../../services/api'

export const updateCategory = async (data) => {
  return await api.patch(`/categories/${data.id}`, data)
}

export const deleteCategory = async (id) => {
  return await api.delete(`/categories/${id}`)
}
