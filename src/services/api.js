import axios from 'axios'
import { objectToQueryString } from '../Util/functions'
const SKIP = 0
const TAKE = 20
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

api.interceptors.request.use(
  async (config) => {
    // Add query parameter to the request URL
    const userData = await localStorage.getItem('resto-app-user')
    const parsedUSerData = JSON.parse(userData)
    config.params = {
      ...config.params,
      orgId: parsedUSerData?.orgId ?? 0,
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api

export const genericFetch = async (url, queryParamObject = {}) => {
  const defaultObject = { skip: SKIP, take: TAKE, ...queryParamObject }
  const queryStringFromObject = objectToQueryString(defaultObject)
  const data = await api.get(`${url}${queryStringFromObject}`)
  return data
}

export const placeOrder = async (data) => {
  return await api.post('/orders', data)
}
