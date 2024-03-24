import api from '../../../services/api'

export const saveCategory = async (data) => {
  return await api.post('/categories', data)
}

export const saveMenu = async (data) => {
  return await api.post('/menus', data)
}

export const updateMenu = async (data) => {
  return await api.patch(`/menus/${data.id}`, data)
}

export const deleteMenu = async (id) => {
  return await api.delete(`/menus/${id}`)
}
