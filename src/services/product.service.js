import axiosApiInstance from '@/plugins/api'
const BASE_ENDPOINT = '/inventory'

export const uploadApi = async (formData) => {
  return await axiosApiInstance.post('http://103.195.237.70:3000/api/storages/upload', formData)
}

export const createProductApi = async (data) => {
  return await axiosApiInstance.post(`${BASE_ENDPOINT}/products`, data)
}
