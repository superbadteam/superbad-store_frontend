import axiosApiInstance from '@/plugins/api'
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_API_URL
const BASE_ENDPOINT = '/identity'

export const refreshAccessToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token')
  const data = {
    refreshToken: refresh_token,
  }
  return await axios.post(`${BASE_ENDPOINT}/auth/refresh-token`, data)
}
export const loginApi = async (data) => {
  return await axiosApiInstance.post(`${BASE_ENDPOINT}/auth/login`, data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'no-cors',
  })
}
export const loginGGApi = async (data) => {
  return await axiosApiInstance.post(`${BASE_ENDPOINT}/auth/login-gg`, data)
}
export const registerApi = async (data) => {
  return await axiosApiInstance.post(`${BASE_ENDPOINT}/auth/register`, data)
}
export const getInfo = async () => {
  return await axiosApiInstance.get(`${BASE_ENDPOINT}/users/me`)
}
