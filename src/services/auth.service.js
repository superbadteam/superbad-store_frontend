import axiosApiInstance from '@/plugins/api'
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const refreshAccessToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token')
  const data = {
    refreshToken: refresh_token,
  }
  return await axios.post('/auth/refresh-tokens', data)
}
export const loginApi = async (data) => {
  return await axiosApiInstance.post('/auth/login', data)
}
export const loginGGApi = async (data) => {
  return await axiosApiInstance.post('/auth/login-gg', data)
}
export const registerApi = async (data) => {
  return await axiosApiInstance.post('/auth/register', data)
}
export const getInfo = async () => {
  return await axiosApiInstance.get('/users/me')
}
